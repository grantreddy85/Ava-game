// Runtime-only canvas labels for Daisy Days physical lot and arrival signs.
var DaisyLotSignLabels = pc.createScript('daisyLotSignLabels');

DaisyLotSignLabels.prototype.makeLabel = function (title, subtitle, yellowBand) {
    var canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f7f0dd';
    ctx.fillRect(0, 0, 512, 256);
    ctx.fillStyle = '#173c53';
    ctx.fillRect(0, 0, 512, 32);
    ctx.fillStyle = '#f4c64e';
    ctx.fillRect(0, 32, 18, 224);
    ctx.fillStyle = '#173c53';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 74px Arial, sans-serif';
    ctx.fillText(title, 266, 111, 430);
    ctx.font = 'bold 42px Arial, sans-serif';
    ctx.fillText(subtitle, 266, 190, 430);

    var texture = new pc.Texture(this.app.graphicsDevice, {
        width: canvas.width,
        height: canvas.height,
        format: pc.PIXELFORMAT_R8_G8_B8_A8,
        mipmaps: true
    });
    texture.setSource(canvas);
    texture.minFilter = pc.FILTER_LINEAR_MIPMAP_LINEAR;
    texture.magFilter = pc.FILTER_LINEAR;
    texture.addressU = pc.ADDRESS_CLAMP_TO_EDGE;
    texture.addressV = pc.ADDRESS_CLAMP_TO_EDGE;

    var material = new pc.StandardMaterial();
    material.diffuseMap = texture;
    material.emissiveMap = texture;
    material.emissive.set(0.72, 0.72, 0.72);
    material.useLighting = false;
    material.useFog = true;
    material.cull = pc.CULLFACE_NONE;
    material.blendType = pc.BLEND_NONE;
    material.update();
    return material;
};

DaisyLotSignLabels.prototype.initialize = function () {
    var signs = this.app.root.findByTag('PLAYER_LOT');
    for (var i = 0; i < signs.length; i++) {
        var lotId = '00';
        var tags = signs[i].tags.list();
        for (var t = 0; t < tags.length; t++) {
            if (tags[t].indexOf('LOT_ID:') === 0) lotId = tags[t].substring(7);
        }
        var board = new pc.Entity('Lot ' + lotId + ' readable face');
        board.addComponent('render', { type: 'plane' });
        board.setLocalPosition(0, 0, -0.72);
        board.setLocalEulerAngles(-90, 0, 0);
        board.setLocalScale(1.72, 0.68, 1);
        board.render.material = this.makeLabel('LOT ' + lotId, 'AVAILABLE', true);
        signs[i].addChild(board);
    }

    var parkBoard = this.app.root.findByName('Daisy Days Park Sign Board');
    if (parkBoard) {
        var brand = new pc.Entity('Daisy Days branded sign face');
        brand.addComponent('render', { type: 'plane' });
        brand.setLocalPosition(0, 0, -0.72);
        brand.setLocalEulerAngles(-90, 0, 0);
        brand.setLocalScale(1.72, 0.62, 1);
        brand.render.material = this.makeLabel('DAISY DAYS', 'HAWKESBURY RIVER', true);
        parkBoard.addChild(brand);
    }
};