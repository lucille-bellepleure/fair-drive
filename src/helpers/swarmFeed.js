function SwarmFeed() {
}

SwarmFeed.prototype.getFeed = async function (address, topic) {
    const res = await window.fds.Account.SwarmStore.SF.get(address, topic)
    return JSON.parse(res)
}

SwarmFeed.prototype.setFeed = async function (address, topic, privateKey, data) {
    const feed = await window.fds.Account.SwarmStore.SF.set(
        address,
        topic,
        privateKey,
        data)
    return feed
}

module.exports = SwarmFeed