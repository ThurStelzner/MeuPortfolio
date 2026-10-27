// Construtores da cena: sala, mesa, notebook, celular, caneca e parede.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export const WALL_Z = -0.9;
export const DESK_TOP = 0.75;

export function createSceneMaterials(textures) {
    const standard = (options) => new THREE.MeshStandardMaterial(options);

    return {
        wall: standard({ color: 0xdcc9ad, roughness: 0.96, metalness: 0 }),
        floor: standard({ map: textures.wood, roughness: 0.82, metalness: 0 }),
        baseboard: standard({ color: 0xd6c3a8, roughness: 0.9, metalness: 0 }),
        rug: standard({ map: textures.rug, roughness: 0.98, metalness: 0 }),

        desk: standard({ color: 0x5f3f2c, roughness: 0.52, metalness: 0.05 }),
        deskEdge: standard({ color: 0x4e3120, roughness: 0.58, metalness: 0.05 }),
        metal: standard({ color: 0x2b2b2b, roughness: 0.38, metalness: 0.72 }),
        matGreen: standard({ color: 0x2b403a, roughness: 0.85, metalness: 0.02 }),
        brass: standard({ color: 0xd9a441, roughness: 0.3, metalness: 0.9 }),
        nameplate: standard({ map: textures.nameplate, roughness: 0.35, metalness: 0.75 }),

        laptopBody: standard({ color: 0xb9bec4, roughness: 0.34, metalness: 0.82 }),
        keyboard: standard({ map: textures.keyboard, roughness: 0.6, metalness: 0.25 }),
        screen: standard({
            map: textures.screen.texture,
            emissive: 0xffffff,
            emissiveMap: textures.screen.texture,
            emissiveIntensity: 0.95,
            roughness: 1,
            metalness: 0
        }),

        phoneBody: standard({ color: 0x1b1e23, roughness: 0.32, metalness: 0.62 }),
        phoneScreen: standard({
            map: textures.phone,
            emissive: 0xffffff,
            emissiveMap: textures.phone,
            emissiveIntensity: 0.8,
            roughness: 1,
            metalness: 0
        }),

        mug: standard({ color: 0xf2e8d5, roughness: 0.6, metalness: 0 }),
        coffee: standard({ color: 0x4a2a1a, roughness: 1, metalness: 0 }),

        string: standard({ color: 0xa8554a, roughness: 0.85, metalness: 0 }),
        pin: standard({ color: 0xd9a441, roughness: 0.28, metalness: 0.9 }),

        paper: standard({ color: 0xfbf8f1, roughness: 0.92, metalness: 0 }),
        photoPlaceholder: standard({ map: textures.photo, roughness: 0.85, metalness: 0 }),
        caption: standard({ color: 0xc9beae, roughness: 0.9, metalness: 0 }),

        noteYellow: standard({ map: textures.noteYellow, roughness: 0.92, metalness: 0, side: THREE.DoubleSide }),
        notePeach: standard({ map: textures.notePeach, roughness: 0.92, metalness: 0, side: THREE.DoubleSide }),
        noteSage: standard({ map: textures.noteSage, roughness: 0.92, metalness: 0, side: THREE.DoubleSide })
    };
}

export function createRoom(materials) {
    const group = new THREE.Group();

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 7), materials.floor);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, 1.7);
    floor.receiveShadow = true;
    group.add(floor);

    const wall = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), materials.wall);
    wall.position.set(0, 2.5, WALL_Z);
    wall.receiveShadow = true;
    group.add(wall);

    const baseboard = new THREE.Mesh(new THREE.BoxGeometry(10, 0.1, 0.045), materials.baseboard);
    baseboard.position.set(0, 0.05, WALL_Z + 0.0225);
    baseboard.castShadow = true;
    baseboard.receiveShadow = true;
    group.add(baseboard);

    const rug = new THREE.Mesh(new THREE.CircleGeometry(1.55, 72), materials.rug);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.006, 0.62);
    rug.receiveShadow = true;
    group.add(rug);

    return group;
}

export function createDesk(materials) {
    const group = new THREE.Group();

    const top = new THREE.Mesh(new RoundedBoxGeometry(2.0, 0.05, 0.62, 3, 0.014), materials.desk);
    top.position.set(0, DESK_TOP - 0.025, 0);
    top.castShadow = true;
    top.receiveShadow = true;
    group.add(top);

    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.70, 0.55), materials.metal);
    leg.position.set(-0.86, 0.35, 0);
    leg.castShadow = true;
    leg.receiveShadow = true;
    group.add(leg);

    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.04, 0.05), materials.metal);
    bar.position.set(-0.18, 0.64, -0.18);
    bar.castShadow = true;
    group.add(bar);

    const unit = new THREE.Mesh(new RoundedBoxGeometry(0.56, 0.70, 0.56, 2, 0.012), materials.desk);
    unit.position.set(0.66, 0.35, 0);
    unit.castShadow = true;
    unit.receiveShadow = true;
    group.add(unit);

    for (let i = 0; i < 3; i++) {
        const y = 0.545 - i * 0.19;
        const front = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.165, 0.02, 2, 0.006), materials.deskEdge);
        front.position.set(0.66, y, 0.28);
        front.castShadow = true;
        front.receiveShadow = true;

        const handle = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.014, 0.014), materials.brass);
        handle.position.set(0.66, y, 0.298);
        handle.castShadow = true;

        group.add(front, handle);
    }

    const mat = new THREE.Mesh(new RoundedBoxGeometry(1.18, 0.006, 0.4, 2, 0.003), materials.matGreen);
    mat.position.set(-0.06, DESK_TOP + 0.003, 0.02);
    mat.receiveShadow = true;
    group.add(mat);

    const plate = new THREE.Mesh(
        new THREE.BoxGeometry(0.26, 0.045, 0.008),
        [materials.brass, materials.brass, materials.brass, materials.brass, materials.nameplate, materials.brass]
    );
    plate.position.set(0, DESK_TOP - 0.028, 0.312);
    plate.castShadow = true;
    group.add(plate);

    return { group, topY: DESK_TOP };
}

export function createLaptop(materials) {
    const group = new THREE.Group();

    const base = new THREE.Mesh(new RoundedBoxGeometry(0.36, 0.018, 0.25, 2, 0.006), materials.laptopBody);
    base.position.y = 0.009;
    base.castShadow = true;
    base.receiveShadow = true;

    const deck = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.24), materials.keyboard);
    deck.rotation.x = -Math.PI / 2;
    deck.position.y = 0.0185;

    const hinge = new THREE.Group();
    hinge.position.set(0, 0.014, -0.115);

    const lid = new THREE.Mesh(new RoundedBoxGeometry(0.36, 0.235, 0.012, 2, 0.006), materials.laptopBody);
    lid.position.y = 0.1175;
    lid.castShadow = true;
    lid.receiveShadow = true;

    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.335, 0.212), materials.screen);
    screen.position.set(0, 0.1175, 0.0068);

    hinge.add(lid, screen);
    hinge.rotation.x = -0.24;

    group.add(base, deck, hinge);
    return group;
}

export function createPhone(materials) {
    const group = new THREE.Group();

    const stand = new THREE.Mesh(new THREE.BoxGeometry(0.088, 0.016, 0.064), materials.phoneBody);
    stand.position.set(0, 0.008, 0.01);
    stand.castShadow = true;
    stand.receiveShadow = true;

    const support = new THREE.Mesh(new THREE.BoxGeometry(0.088, 0.05, 0.012), materials.phoneBody);
    support.position.set(0, 0.028, -0.028);
    support.rotation.x = -0.28;
    support.castShadow = true;

    const tilt = new THREE.Group();
    tilt.position.y = 0.014;
    tilt.rotation.x = -0.05;

    const body = new THREE.Mesh(new RoundedBoxGeometry(0.076, 0.154, 0.009, 3, 0.005), materials.phoneBody);
    body.position.y = 0.077;
    body.castShadow = true;
    body.receiveShadow = true;

    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.068, 0.142), materials.phoneScreen);
    screen.position.set(0, 0.077, 0.0052);

    tilt.add(body, screen);
    group.add(stand, support, tilt);
    return group;
}

export function createMug(materials, steamTexture) {
    const group = new THREE.Group();

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.032, 0.09, 28), materials.mug);
    body.position.y = 0.045;
    body.castShadow = true;
    body.receiveShadow = true;

    const coffee = new THREE.Mesh(new THREE.CircleGeometry(0.03, 24), materials.coffee);
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.y = 0.0895;

    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.007, 12, 28), materials.mug);
    handle.position.set(0.038, 0.05, 0);
    handle.castShadow = true;

    const steam = new THREE.Group();
    for (let i = 0; i < 3; i++) {
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
            map: steamTexture,
            transparent: true,
            opacity: 0.2,
            depthWrite: false
        }));
        const scale = 0.05 + i * 0.014;
        sprite.scale.setScalar(scale);
        sprite.position.set((i - 1) * 0.02, 0.12, 0.006);
        sprite.userData = {
            baseY: 0.12,
            speed: 0.16 + i * 0.03,
            offset: i * 0.37
        };
        steam.add(sprite);
    }

    group.add(body, coffee, handle, steam);
    return { group, steam };
}

function buildPolaroid(parent, materials) {
    const frame = new THREE.Mesh(new RoundedBoxGeometry(0.21, 0.25, 0.009, 2, 0.003), materials.paper);
    frame.position.y = -0.125;
    frame.castShadow = true;
    frame.receiveShadow = true;

    const photo = new THREE.Mesh(new THREE.PlaneGeometry(0.175, 0.175), materials.photoPlaceholder);
    photo.position.set(0, -0.1, 0.005);

    const caption = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.007), materials.caption);
    caption.position.set(0, -0.225, 0.005);

    parent.add(frame, photo, caption);
}

function buildNote(parent, materials, colorKey) {
    const materialsByColor = {
        yellow: materials.noteYellow,
        peach: materials.notePeach,
        sage: materials.noteSage
    };

    const note = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.12), materialsByColor[colorKey]);
    note.position.y = -0.063;
    note.castShadow = true;
    parent.add(note);
}

export function createWallDecor(materials) {
    const group = new THREE.Group();
    const interactives = [];

    const anchors = [
        { x: -1.58, y: 1.52 },
        { x: -1.26, y: 1.64, kind: 'photo', rot: 0.07 },
        { x: -0.92, y: 1.38, kind: 'note', color: 'yellow', rot: -0.1 },
        { x: -0.58, y: 1.72, kind: 'photo', rot: -0.05 },
        { x: -0.2, y: 1.34, kind: 'note', color: 'peach', rot: 0.08 },
        { x: 0.22, y: 1.62, kind: 'photo', rot: 0.05 },
        { x: 0.6, y: 1.4, kind: 'note', color: 'sage', rot: -0.07 },
        { x: 0.96, y: 1.7, kind: 'photo', rot: -0.06 },
        { x: 1.5, y: 1.5 }
    ];

    const points = [];
    for (let i = 0; i < anchors.length; i++) {
        points.push(new THREE.Vector3(anchors[i].x, anchors[i].y, WALL_Z + 0.02));
        if (i < anchors.length - 1) {
            const midX = (anchors[i].x + anchors[i + 1].x) / 2;
            const midY = Math.min(anchors[i].y, anchors[i + 1].y) - 0.055;
            points.push(new THREE.Vector3(midX, midY, WALL_Z + 0.024));
        }
    }

    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.6);
    const string = new THREE.Mesh(new THREE.TubeGeometry(curve, 180, 0.0032, 8, false), materials.string);
    string.castShadow = true;
    group.add(string);

    for (const anchor of anchors) {
        if (!anchor.kind) continue;

        const pin = new THREE.Mesh(new THREE.SphereGeometry(0.0095, 16, 16), materials.pin);
        pin.position.set(anchor.x, anchor.y, WALL_Z + 0.03);
        pin.castShadow = true;
        group.add(pin);

        const outer = new THREE.Group();
        outer.position.set(anchor.x, anchor.y, WALL_Z + 0.034);
        outer.rotation.z = anchor.rot || 0;

        const inner = new THREE.Group();
        if (anchor.kind === 'photo') {
            buildPolaroid(inner, materials);
        } else {
            buildNote(inner, materials, anchor.color);
        }
        outer.add(inner);
        group.add(outer);

        interactives.push({
            root: outer,
            inner,
            baseY: outer.position.y,
            lift: anchor.kind === 'photo' ? 0.016 : 0.011,
            spin: anchor.kind === 'photo' ? 0.05 : 0.1,
            current: 0,
            hover: 0
        });
    }

    return { group, interactives };
}

// Normaliza um modelo GLTF: escala, centraliza e apoia a base em y = 0.
export function prepareGltf(gltf, { height, maxSize, yaw = 0, center = false } = {}) {
    const root = gltf.scene;

    root.traverse((object) => {
        if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
            if (object.material && 'envMapIntensity' in object.material) {
                object.material.envMapIntensity = 0.7;
            }
        }
    });

    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    box.getSize(size);

    const scale = height
        ? height / size.y
        : maxSize / Math.max(size.x, size.y, size.z);

    root.scale.setScalar(scale);
    box.setFromObject(root);

    const centerVector = new THREE.Vector3();
    box.getCenter(centerVector);
    root.position.set(
        -centerVector.x,
        center ? -centerVector.y : -box.min.y,
        -centerVector.z
    );

    const wrapper = new THREE.Group();
    wrapper.add(root);
    wrapper.rotation.y = yaw;
    return wrapper;
}
