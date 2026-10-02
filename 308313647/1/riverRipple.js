// Gentle pulsing scale gives the river glints a soft animated ripple.
var RiverRipple = pc.createScript('riverRipple');
RiverRipple.attributes.add('speed', { type: 'number', default: 0.55 });
RiverRipple.attributes.add('phase', { type: 'number', default: 0 });
RiverRipple.prototype.initialize = function () { this.baseScale = this.entity.getLocalScale().clone(); };
RiverRipple.prototype.update = function (dt) {
    this.phase += dt * this.speed;
    var wave = 1 + Math.sin(this.phase) * 0.08;
    this.entity.setLocalScale(this.baseScale.x * wave, this.baseScale.y, this.baseScale.z * (2 - wave));
};