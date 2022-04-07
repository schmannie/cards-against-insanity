module.exports = {
    filterFunction: message => {
        return process.env.NODE_ENV === 'development' || message.context.logLevel >= 30;
    },
};
