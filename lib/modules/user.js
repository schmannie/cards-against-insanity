const UserActivity = {
    OFFLINE: 'is offline since %s',
    LOBBY: 'in lobby',
    PLAYING: 'is playing in %s (%d/%d)',
};

const IUser = {
    id: '',
    username: '',
    hash: '',
    salt: '',
    member_since: '',
    actvitiy: Activity.OFFLINE,
    last_login: '',
    updateLastLogin: function (newLoginDate) {
        this.last_login = newLoginDate;
    },
};

function User(id, username, hash, salt, member_since) {

    const user = Object.create(IUser);
    user.id = id;
    user.username = username;
    user.hash = hash;
    user.salt = salt;
    user.member_since = this.last_login = member_since;

    return user;
}

function UserOverview(user) {
    return {
        username: user.username,
        actvitiy: user.actvitiy,
        last_login: user.last_login,
    }
}

export {
    UserActivity,
    IUser,
    User,
    UserOverview,
};
