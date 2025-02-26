// @ts-ignore - Types not available for @webex/common
import {Defer} from '@webex/common';

import Metrics from '../metrics';
import BEHAVIORAL_METRICS from '../metrics/constants';
import LoggerProxy from '../common/logs/logger-proxy';
import {ROAP} from '../constants';

import RoapRequest from './request';
import Meeting from '../meeting';

const TURN_DISCOVERY_TIMEOUT = 10; // in seconds

// Roap spec says that seq should start from 1, but TURN discovery works fine with seq=0
// and this is handy for us, because TURN discovery is always done before the first SDP exchange,
// so we can do it with seq=0 or not do it at all and then we create the RoapMediaConnection
// and do the SDP offer with seq=1
const TURN_DISCOVERY_SEQ = 0;

/**
 * Handles the process of finding out TURN server information from Linus.
 * This is achieved by sending a TURN_DISCOVERY_REQUEST.
 */
export default class TurnDiscovery {
  private roapRequest: RoapRequest;

  private defer?: Defer; // used for waiting for the response

  private turnInfo: {
    url: string;
    username: string;
    password: string;
  };

  private responseTimer?: ReturnType<typeof setTimeout>;

  /**
   * Constructor
   *
   * @param {RoapRequest} roapRequest
   */
  constructor(roapRequest: RoapRequest) {
    this.roapRequest = roapRequest;
    this.turnInfo = {
      url: '',
      username: '',
      password: '',
    };
  }

  /**
   * waits for TURN_DISCOVERY_RESPONSE message to arrive
   *
   * @returns {Promise}
   * @private
   * @memberof Roap
   */
  private waitForTurnDiscoveryResponse() {
    if (!this.defer) {
      LoggerProxy.logger.warn(
        'Roap:turnDiscovery#waitForTurnDiscoveryResponse --> TURN discovery is not in progress'
      );

      return Promise.reject(
        new Error('waitForTurnDiscoveryResponse() called before sendRoapTurnDiscoveryRequest()')
      );
    }

    const {defer} = this;

    this.responseTimer = setTimeout(() => {
      LoggerProxy.logger.warn(
        `Roap:turnDiscovery#waitForTurnDiscoveryResponse --> timeout! no response arrived within ${TURN_DISCOVERY_TIMEOUT} seconds`
      );

      defer.reject(new Error('Timed out waiting for TURN_DISCOVERY_RESPONSE'));
    }, TURN_DISCOVERY_TIMEOUT * 1000);

    LoggerProxy.logger.info(
      'Roap:turnDiscovery#waitForTurnDiscoveryResponse --> waiting for TURN_DISCOVERY_RESPONSE...'
    );

    return defer.promise;
  }

  /**
   * handles TURN_DISCOVERY_RESPONSE roap message
   *
   * @param {Object} roapMessage
   * @returns {void}
   * @public
   * @memberof Roap
   */
  public handleTurnDiscoveryResponse(roapMessage: object) {
    // @ts-ignore - Fix missing type
    const {headers} = roapMessage;

    if (!this.defer) {
      LoggerProxy.logger.warn(
        'Roap:turnDiscovery#handleTurnDiscoveryResponse --> unexpected TURN discovery response'
      );

      return;
    }

    const expectedHeaders = [
      {headerName: 'x-cisco-turn-url', field: 'url'},
      {headerName: 'x-cisco-turn-username', field: 'username'},
      {headerName: 'x-cisco-turn-password', field: 'password'},
    ];

    let foundHeaders = 0;

    headers?.forEach((receivedHeader) => {
      // check if it matches any of our expected headers
      expectedHeaders.forEach((expectedHeader) => {
        if (receivedHeader.startsWith(`${expectedHeader.headerName}=`)) {
          this.turnInfo[expectedHeader.field] = receivedHeader.substring(
            expectedHeader.headerName.length + 1
          );
          foundHeaders += 1;
        }
      });
    });

    clearTimeout(this.responseTimer);
    this.responseTimer = undefined;

    if (foundHeaders !== expectedHeaders.length) {
      LoggerProxy.logger.warn(
        `Roap:turnDiscovery#handleTurnDiscoveryResponse --> missing some headers, received: ${JSON.stringify(
          headers
        )}`
      );
      this.defer.reject(
        new Error(`TURN_DISCOVERY_RESPONSE missing some headers: ${JSON.stringify(headers)}`)
      );
    } else {
      LoggerProxy.logger.info(
        `Roap:turnDiscovery#handleTurnDiscoveryResponse --> received a valid response, url=${this.turnInfo.url}`
      );
      this.defer.resolve();
    }
  }

  /**
   * sends the TURN_DISCOVERY_REQUEST roap request
   *
   * @param {Meeting} meeting
   * @param {Boolean} isReconnecting
   * @returns {Promise}
   * @private
   * @memberof Roap
   */
  sendRoapTurnDiscoveryRequest(meeting: Meeting, isReconnecting: boolean) {
    if (this.defer) {
      LoggerProxy.logger.warn(
        'Roap:turnDiscovery#sendRoapTurnDiscoveryRequest --> already in progress'
      );

      return Promise.resolve();
    }

    this.defer = new Defer();

    const roapMessage = {
      messageType: ROAP.ROAP_TYPES.TURN_DISCOVERY_REQUEST,
      version: ROAP.ROAP_VERSION,
      seq: TURN_DISCOVERY_SEQ,
    };

    LoggerProxy.logger.info(
      'Roap:turnDiscovery#sendRoapTurnDiscoveryRequest --> sending TURN_DISCOVERY_REQUEST'
    );

    return this.roapRequest
      .sendRoap({
        roapMessage,
        correlationId: meeting.correlationId,
        // @ts-ignore - Fix missing type
        locusSelfUrl: meeting.selfUrl,
        // @ts-ignore - Fix missing type
        mediaId: isReconnecting ? '' : meeting.mediaId,
        audioMuted: meeting.audio?.isLocallyMuted(),
        videoMuted: meeting.video?.isLocallyMuted(),
        meetingId: meeting.id,
        preferTranscoding: !meeting.isMultistream,
      })
      .then(({mediaConnections}) => {
        if (mediaConnections) {
          meeting.updateMediaConnections(mediaConnections);
        }
      });
  }

  /**
   * Sends the OK message that server expects to receive
   * after it sends us TURN_DISCOVERY_RESPONSE
   *
   * @param {Meeting} meeting
   * @returns {Promise}
   */
  sendRoapOK(meeting: Meeting) {
    LoggerProxy.logger.info('Roap:turnDiscovery#sendRoapOK --> sending OK');

    return this.roapRequest.sendRoap({
      roapMessage: {
        messageType: ROAP.ROAP_TYPES.OK,
        version: ROAP.ROAP_VERSION,
        seq: TURN_DISCOVERY_SEQ,
      },
      // @ts-ignore - fix type
      locusSelfUrl: meeting.selfUrl,
      // @ts-ignore - fix type
      mediaId: meeting.mediaId,
      correlationId: meeting.correlationId,
      audioMuted: meeting.audio?.isLocallyMuted(),
      videoMuted: meeting.video?.isLocallyMuted(),
      meetingId: meeting.id,
      preferTranscoding: !meeting.isMultistream,
    });
  }

  /**
   * Retrieves TURN server information from the backend by doing
   * a roap message exchange:
   * client                             server
   *  | -----TURN_DISCOVERY_REQUEST-----> |
   *  | <----TURN_DISCOVERY_RESPONSE----- |
   *  | --------------OK----------------> |
   *
   * This TURN discovery roap exchange is always done with seq=0.
   * The RoapMediaConnection SDP exchange always starts with seq=1,
   * so it works fine no matter if TURN discovery is done or not.
   *
   * @param {Meeting} meeting
   * @param {Boolean} isReconnecting should be set to true if this is a new
   *                                 media connection just after a reconnection
   * @returns {Promise}
   */
  async doTurnDiscovery(meeting: Meeting, isReconnecting?: boolean) {
    // @ts-ignore - fix type
    const isAnyClusterReachable = await meeting.webex.meetings.reachability.isAnyClusterReachable();

    if (isAnyClusterReachable) {
      LoggerProxy.logger.info(
        'Roap:turnDiscovery#doTurnDiscovery --> reachability has not failed, skipping TURN discovery'
      );

      return {
        turnServerInfo: undefined,
        turnDiscoverySkippedReason: 'reachability',
      };
    }

    // @ts-ignore - fix type
    if (!meeting.config.experimental.enableTurnDiscovery) {
      LoggerProxy.logger.info(
        'Roap:turnDiscovery#doTurnDiscovery --> TURN discovery disabled in config, skipping it'
      );

      return {turnServerInfo: undefined, turnDiscoverySkippedReason: 'config'};
    }

    return this.sendRoapTurnDiscoveryRequest(meeting, isReconnecting)
      .then(() => this.waitForTurnDiscoveryResponse())
      .then(() => this.sendRoapOK(meeting))
      .then(() => {
        this.defer = undefined;

        LoggerProxy.logger.info('Roap:turnDiscovery#doTurnDiscovery --> TURN discovery completed');

        return {turnServerInfo: this.turnInfo, turnDiscoverySkippedReason: undefined};
      })
      .catch((e) => {
        // we catch any errors and resolve with no turn information so that the normal call join flow can continue without TURN
        LoggerProxy.logger.info(
          `Roap:turnDiscovery#doTurnDiscovery --> TURN discovery failed, continuing without TURN: ${e}`
        );

        Metrics.sendBehavioralMetric(BEHAVIORAL_METRICS.TURN_DISCOVERY_FAILURE, {
          correlation_id: meeting.correlationId,
          locus_id: meeting.locusUrl.split('/').pop(),
          reason: e.message,
          stack: e.stack,
        });

        return {turnServerInfo: undefined, turnDiscoverySkippedReason: undefined};
      });
  }
}
