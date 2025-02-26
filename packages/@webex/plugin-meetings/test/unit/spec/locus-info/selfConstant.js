export const self = {
  deviceUrl: 'https://wdm-a.wbx2.com/wdm/api/v1/devices/20eabde3-4254-48da-9a24',
  alertHint: {
    action: 'NONE',
  },
  alertType: {
    action: 'NONE',
  },
  callbackInfo: {
    callbackAddress: 'alice@alpha.webex.com',
    callbackType: 'SIPURI',
  },
  lookUpInfo: {
    lookupLink:
      'https://locus.meet-a.prod.meetapi.webex.com/locus/api/v1/loci/meetingInfo/4e073f82-f5b6-31e5-93b3?type=LOCUS_ID&useUriLookup=false',
    type: 'MEETING',
  },
  isCreator: false,
  identity: '344ea183-9d5d-4e77-aed2-',
  url: 'https://locus.meet-a.prod.meetapi.webex.com/locus/api/v1/loci/4e073f82-f5b6-31e5-93b3/participant/e0d54e94-226c-3290-b75a-',
  state: 'JOINED',
  type: 'USER',
  person: {
    id: '344ea183-9d5d-4e77-aed2-',
    email: 'alic@cisco.com',
    name: 'alice',
    isExternal: false,
    orgId: '1eb65fdf-9643-417f-9974',
  },
  devices: [
    {
      url: 'https://wdm-a.wbx2.com/wdm/api/v1/devices/20eabde3-4254-48da-9a24',
      deviceType: 'WEB',
      mediaConnections: [
        {
          mediaId: '5706ee09-b2f6-4d0a-b43e-05dbcdea524d',
          actionsUrl:
            'https://cme-junctionbox-apdx2-006-apdx2-public.wbx2.com:443/calliope/api/v1/rest/send/16a7d18c-71a5-4f51-8732-b456e7832197/calliope/api/v1/confluences/cd12fc68-53e9-43c2-be01-/actions',
          type: 'SDP',
        },
      ],
      mediaSessions: [
        {
          mediaType: 'audio',
          mediaContent: 'main',
          direction: 'sendrecv',
          state: 'active',
        },
        {
          mediaType: 'video',
          mediaContent: 'main',
          direction: 'sendrecv',
          state: 'active',
        },
        {
          mediaType: 'audio',
          mediaContent: 'slides',
          direction: 'inactive',
          state: 'inactive',
        },
        {
          mediaType: 'video',
          mediaContent: 'slides',
          direction: 'recvonly',
          state: 'active',
        },
      ],
      mediaSessionsExternal: false,
      state: 'JOINED',
      intent: {type: ''},
      intents: [null],
      keepAliveSecs: 20,
      callLegId: '84bbb491-598f-4828-bd27',
      correlationId: '74421718-e1f8-4555-9497',
      isVideoCallback: false,
      csis: [515285760, 515285761, 3779681281, 3779681280],
      serverTranscoded: true,
      serverComposed: true,
      availableLayouts: ['Single', 'ActivePresence', 'Prominent', 'Equal', 'OnePlusN'],
    },
  ],
  status: {
    audioStatus: 'SENDRECV',
    videoStatus: 'SENDRECV',
    videoSlidesStatus: 'RECVONLY',
    audioSlidesStatus: 'INACTIVE',
    csis: [515285760, 515285761, 3779681281, 3779681280],
  },
  suggestedMedia: [
    {
      mediaType: 'audio',
      mediaContent: 'main',
      direction: 'inactive',
    },
    {
      mediaType: 'video',
      mediaContent: 'main',
      direction: 'recvonly',
    },
    {
      mediaType: 'video',
      mediaContent: 'slides',
      direction: 'sendrecv',
    },
  ],
  controls: {
    audio: {
      muted: false,
      requestedToUnmute: false,
      meta: {},
    },
    breakout: {
      sessions: {
        active: [
          {
            name: 'Breakout session 2',
            groupId: '0e73abb8-5584-49d8-be8d-806d2a8247ca',
            sessionId: '1cf41ab1-2e57-4d95-b7e9-5613acddfb0f',
            sessionType: 'BREAKOUT'
          },
        ],
        allowed: [
          {
            name: 'Breakout session 2',
            groupId: '0e73abb8-5584-49d8-be8d-806d2a8247ca',
            sessionId: '1cf41ab1-2e57-4d95-b7e9-5613acddfb0f',
            sessionType: 'BREAKOUT'
          },
        ]
      },
      meta: {
        modifiedBy: '347ef89e-e1be-40a3-849c-731bdd935e62',
        lastModified: '2023-01-10T10:10:06.813Z',
        readOnly: true
      }
    },
    localRecord: {
      recording: false,
    },
    layouts: [
      {
        type: 'activePresence',
        deviceUrl: 'https://wdm-a.wbx2.com/wdm/api/v1/devices/20eabde3-4254-48da-9a24',
      },
    ],
    role: {
      presenter: true,
      roles: [
        {
          type: 'PRESENTER',
          hasRole: true,
          meta: {
            lastModified: '2020-07-20T20:32:35.259Z',
          },
        },
      ],
    },
  },
  enableDTMF: true,
  id: 'e0d54e94-226c-3290-b75a-',
  guest: false,
  resourceGuest: false,
  moderator: true,
  panelist: false,
  mediaBaseUrl:
    'https://locus.meet-a.prod.meetapi.webex.com/locus/api/v1/loci/4e073f82-f5b6-31e5-93b3/participant/e0d54e94-226c-3290-b75a-/media',
  canNotViewTheParticipantList: false,
  isSharingBlocked: false,
};

export const selfWithInactivity = {
  deviceUrl: 'https://wdm-a.wbx2.com/wdm/api/v1/devices/20eabde3-4254-48da-9a24',
  alertHint: {
    action: 'NONE',
  },
  alertType: {
    action: 'NONE',
  },
  callbackInfo: {
    callbackAddress: 'alice@alpha.webex.com',
    callbackType: 'SIPURI',
  },
  lookUpInfo: {
    lookupLink:
      'https://locus.meet-a.prod.meetapi.webex.com/locus/api/v1/loci/meetingInfo/4e073f82-f5b6-31e5-93b3?type=LOCUS_ID&useUriLookup=false',
    type: 'MEETING',
  },
  isCreator: false,
  identity: '344ea183-9d5d-4e77-aed2-',
  url: 'https://locus.meet-a.prod.meetapi.webex.com/locus/api/v1/loci/4e073f82-f5b6-31e5-93b3/participant/e0d54e94-226c-3290-b75a-',
  state: 'JOINED',
  type: 'USER',
  person: {
    id: '344ea183-9d5d-4e77-aed2-',
    email: 'alic@cisco.com',
    name: 'alice',
    isExternal: false,
    orgId: '1eb65fdf-9643-417f-9974',
  },
  devices: [
    {
      url: 'https://wdm-a.wbx2.com/wdm/api/v1/devices/20eabde3-4254-48da-9a24',
      deviceType: 'WEB',
      mediaConnections: [
        {
          mediaId: '5706ee09-b2f6-4d0a-b43e-05dbcdea524d',
          actionsUrl:
            'https://cme-junctionbox-apdx2-006-apdx2-public.wbx2.com:443/calliope/api/v1/rest/send/16a7d18c-71a5-4f51-8732-b456e7832197/calliope/api/v1/confluences/cd12fc68-53e9-43c2-be01-/actions',
          type: 'SDP',
        },
      ],
      mediaSessions: [
        {
          mediaType: 'audio',
          mediaContent: 'main',
          direction: 'sendrecv',
          state: 'inactive',
        },
        {
          mediaType: 'video',
          mediaContent: 'main',
          direction: 'sendrecv',
          state: 'inactive',
        },
        {
          mediaType: 'audio',
          mediaContent: 'slides',
          direction: 'inactive',
          state: 'inactive',
        },
        {
          mediaType: 'video',
          mediaContent: 'slides',
          direction: 'recvonly',
          state: 'inactive',
        },
      ],
      mediaSessionsExternal: false,
      state: 'JOINED',
      intents: [null],
      keepAliveSecs: 20,
      callLegId: '84bbb491-598f-4828-bd27',
      correlationId: '74421718-e1f8-4555-9497',
      isVideoCallback: false,
      csis: [515285760, 515285761, 3779681281, 3779681280],
      serverTranscoded: true,
      serverComposed: true,
      availableLayouts: ['Single', 'ActivePresence', 'Prominent', 'Equal', 'OnePlusN'],
    },
  ],
  status: {
    audioStatus: 'SENDRECV',
    videoStatus: 'SENDRECV',
    videoSlidesStatus: 'RECVONLY',
    audioSlidesStatus: 'INACTIVE',
    csis: [515285760, 515285761, 3779681281, 3779681280],
  },
  suggestedMedia: [
    {
      mediaType: 'audio',
      mediaContent: 'main',
      direction: 'inactive',
    },
    {
      mediaType: 'video',
      mediaContent: 'main',
      direction: 'recvonly',
    },
    {
      mediaType: 'video',
      mediaContent: 'slides',
      direction: 'sendrecv',
    },
  ],
  controls: {
    audio: {
      muted: false,
      requestedToUnmute: false,
      meta: {},
    },
    localRecord: {
      recording: false,
    },
    layouts: [
      {
        type: 'activePresence',
        deviceUrl: 'https://wdm-a.wbx2.com/wdm/api/v1/devices/20eabde3-4254-48da-9a24',
      },
    ],
    role: {
      presenter: true,
      roles: [
        {
          type: 'PRESENTER',
          hasRole: true,
          meta: {
            lastModified: '2020-07-20T20:32:35.259Z',
          },
        },
      ],
    },
  },
  enableDTMF: true,
  id: 'e0d54e94-226c-3290-b75a-',
  guest: false,
  resourceGuest: false,
  moderator: true,
  panelist: false,
  mediaBaseUrl:
    'https://locus.meet-a.prod.meetapi.webex.com/locus/api/v1/loci/4e073f82-f5b6-31e5-93b3/participant/e0d54e94-226c-3290-b75a-/media',
};
