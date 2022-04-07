const LOBBY_MESSAGE_TYPE = {
    CREATE: 'lobby_create',
    UPDATE: 'lobby_update',
    UPDATED: 'lobby_updated',

    CHANGE_HOST: 'lobby_change_host',
    HOST_UPDATED: 'lobby_host_updated',

    JOIN_REQUEST: 'lobby_request_join',
    JOIN_SUCCESS: 'lobby_join_success',
    JOIN_FAILURE: 'lobby_join_failure',

    LEFT: 'lobby_left',
};


const LOBBY_REQUEST = {
    CREATE: {
        type: LOBBY_MESSAGE_TYPE.CREATE,
        body: {
            id: '',
            name: '',
            host: '',
            players: [],
            options: {},
        },
    },
    UPDATE: {
        type: LOBBY_MESSAGE_TYPE.UPDATE,
        body: {
            id: '',
            options: {},
        },
    },
    CHANGE_HOST: {
        type: LOBBY_MESSAGE_TYPE.CHANGE_HOST,
        body: {
            id: '',
        },
    },
    JOIN: {
        type: LOBBY_MESSAGE_TYPE.JOIN_REQUEST,
        body: {
            id: '',
        },
    },
};
