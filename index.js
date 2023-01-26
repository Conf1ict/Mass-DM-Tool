const { ClusterManager, HeartbeatManager } = require('discord-hybrid-sharding');
const { token } = require("./settings.json")
const manager = new ClusterManager(`${__dirname}/bot.js`, {
    totalShards: 'auto', // or 'auto'
    /// Check below for more options
    shardsPerClusters: 5,
    totalClusters: 'auto',
    mode: 'process', // you can also choose "worker"
    token: token,
});
try {
    
    manager.extend(
        new HeartbeatManager({
            interval: 2000, // Interval to send a heartbeat
            maxMissedHeartbeats: 5, // Maximum amount of missed Heartbeats until Cluster will get respawned
        })
    )

manager.on('clusterCreate', cluster => console.log(`Loaded and Launched: ${cluster.id}`));
manager.spawn({ timeout: -1 });
} catch (error) {
console.error(error)
}
