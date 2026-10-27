// Escritório 3D — Three.js + modelos GLB (Poly Haven, CC0).
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import * as T from './office3d/textures.js';
import {
    WALL_Z,
    createSceneMaterials,
    createRoom,
    createDesk,
    createLaptop,
    createPhone,
    createMug,
    createWallDecor,
    prepareGltf
} from './office3d/props.js';

const canvas = document.getElementById('office-canvas');
const loaderFill = document.getElementById('loader-fill');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const params = new URLSearchParams(window.location.search);

function showFallback(message) {
    const loader = document.getElementById('loader');
    if (!loader) return;
    loader.innerHTML = `
        <div class="loader__badge">AIS</div>
        <p class="loader__text">${message}</p>
        <p class="loader__text"><a href="escritorio.html" style="color:#e8be69">abrir versão 2D</a></p>
    `;
}

let renderer;
try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
} catch (error) {
    showFallback('seu navegador não conseguiu iniciar o WebGL');
    throw error;
}

renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.98;

const scene = new THREE.Scene();

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.5;
pmrem.dispose();

// ---------- câmera (ortográfica, estilo diorama) ----------
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 40);
const cameraDir = new THREE.Vector3(0.17, 0.56, 1).normalize();
const cameraTarget = new THREE.Vector3(0, 0.94, -0.22);
const CAMERA_DISTANCE = 9;

camera.position.copy(cameraTarget).addScaledVector(cameraDir, CAMERA_DISTANCE);
camera.lookAt(cameraTarget);

const baseCameraPos = camera.position.clone();
const forward = new THREE.Vector3().subVectors(cameraTarget, camera.position).normalize();
const camRight = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
const camUp = new THREE.Vector3().crossVectors(camRight, forward).normalize();

function updateCameraFrustum() {
    const aspect = window.innerWidth / window.innerHeight;
    const portrait = aspect < 0.78;
    const height = portrait ? 1.92 : 2.4;
    const width = height * aspect;
    camera.left = -width / 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();

    cameraTarget.set(0, portrait ? 0.98 : 0.94, -0.22);
    camera.position.copy(cameraTarget).addScaledVector(cameraDir, CAMERA_DISTANCE);
    baseCameraPos.copy(camera.position);
    camera.lookAt(cameraTarget);
}
updateCameraFrustum();

// ---------- luzes ----------
scene.add(new THREE.HemisphereLight(0xfff2e0, 0x6b4a33, 0.55));

const key = new THREE.DirectionalLight(0xfff0d8, 1.75);
key.position.set(2.8, 3.8, 2.6);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.left = -3;
key.shadow.camera.right = 3;
key.shadow.camera.top = 3;
key.shadow.camera.bottom = -3;
key.shadow.camera.near = 0.5;
key.shadow.camera.far = 12;
key.shadow.bias = -0.0004;
key.shadow.normalBias = 0.02;
key.target.position.set(0, 0.6, -0.2);
scene.add(key, key.target);

const fill = new THREE.DirectionalLight(0xcfd8ff, 0.32);
fill.position.set(-3, 2.2, 1.6);
scene.add(fill);

const lampLight = new THREE.PointLight(0xffc98a, 3.0, 5.5, 2);
lampLight.position.set(0.44, 1.2, 0.02);
lampLight.castShadow = true;
lampLight.shadow.mapSize.set(1024, 1024);
lampLight.shadow.bias = -0.002;
lampLight.shadow.normalBias = 0.02;
scene.add(lampLight);

const screenLight = new THREE.PointLight(0x9db8ff, 0.55, 1.1, 2);
screenLight.position.set(-0.14, 0.9, 0.08);
scene.add(screenLight);

// ---------- texturas e materiais ----------
const woodTexture = T.makeWoodFloorTexture();
woodTexture.wrapS = THREE.RepeatWrapping;
woodTexture.wrapT = THREE.RepeatWrapping;
woodTexture.repeat.set(2.4, 1.8);
woodTexture.rotation = Math.PI / 2;
woodTexture.center.set(0.5, 0.5);

const textures = {
    wood: woodTexture,
    rug: T.makeRugTexture(),
    keyboard: T.makeKeyboardTexture(),
    nameplate: T.makeNameplateTexture(),
    photo: T.makePhotoPlaceholderTexture(),
    steam: T.makeSteamTexture(),
    screen: T.createScreen(),
    phone: T.makePhoneTexture(),
    noteYellow: T.makePostitTexture({ base: '#f0cf74', base2: '#e2ba55', fold: '#c9a24a', foldLight: '#f4dd93', ink: '#8a6a2e', variant: 0 }),
    notePeach: T.makePostitTexture({ base: '#eaa684', base2: '#d98f6a', fold: '#b96f4f', foldLight: '#f2b99b', ink: '#8a4e36', variant: 1 }),
    noteSage: T.makePostitTexture({ base: '#b6cbb0', base2: '#9cb697', fold: '#7e9878', foldLight: '#c4d7be', ink: '#4f6b4a', variant: 2 })
};

const materials = createSceneMaterials(textures);
const interactives = [];

function addInteractive(content, position, { lift = 0.01, spin = 0 } = {}) {
    const outer = new THREE.Group();
    outer.position.copy(position);
    outer.add(content);

    const entry = {
        root: outer,
        inner: content,
        lift,
        spin,
        current: 0
    };
    interactives.push(entry);
    scene.add(outer);
    return entry;
}

// ---------- cena estática ----------
scene.add(createRoom(materials));

const { group: deskGroup, topY } = createDesk(materials);
scene.add(deskGroup);

const wallDecor = createWallDecor(materials);
scene.add(wallDecor.group);
interactives.push(...wallDecor.interactives);

// notebook (feito em código, com a tela do portfólio)
const laptopEntry = addInteractive(
    createLaptop(materials),
    new THREE.Vector3(-0.14, topY, 0.02),
    { lift: 0.012 }
);

// celular
const phoneInner = createPhone(materials);
phoneInner.rotation.y = -0.12;
addInteractive(phoneInner, new THREE.Vector3(0.2, topY, 0.04), { lift: 0.01 });

// caneca
const { group: mugGroup, steam } = createMug(materials, textures.steam);
mugGroup.position.set(-0.52, topY, 0.15);
scene.add(mugGroup);

// cabo do notebook
const cable = new THREE.Mesh(
    new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
            new THREE.Vector3(0.02, topY - 0.01, -0.16),
            new THREE.Vector3(0.2, topY - 0.06, -0.24),
            new THREE.Vector3(0.45, 0.5, -0.42),
            new THREE.Vector3(0.62, 0.03, -0.5)
        ]),
        60,
        0.004,
        6,
        false
    ),
    materials.metal
);
cable.castShadow = true;
scene.add(cable);

// ---------- modelos GLB ----------
const manager = new THREE.LoadingManager();
manager.onProgress = (url, loaded, total) => {
    if (loaderFill) loaderFill.style.width = Math.round((loaded / total) * 100) + '%';
};

const gltfLoader = new GLTFLoader(manager);
const loadGltf = (url) => new Promise((resolve, reject) => gltfLoader.load(url, resolve, undefined, reject));

const modelUrls = {
    lamp: 'assets/models/desk-lamp.glb',
    plant: 'assets/models/plant-alocasia.glb',
    snake: 'assets/models/plant-snake.glb',
    clock: 'assets/models/wall-clock.glb',
    notebook: 'assets/models/notebook.glb',
    penCup: 'assets/models/pen-cup.glb',
    notepads: 'assets/models/notepads.glb',
    retroLaptop: 'assets/models/classic-laptop.glb',
    books: 'assets/models/books.glb'
};

const models = {};
await Promise.all(
    Object.entries(modelUrls).map(async ([name, url]) => {
        try {
            models[name] = await loadGltf(url);
        } catch (error) {
            console.warn('modelo não carregou:', url, error);
        }
    })
);

if (models.lamp) {
    const lamp = prepareGltf(models.lamp, { height: 0.58, yaw: Math.PI });
    lamp.position.set(0.62, topY, -0.04);
    scene.add(lamp);
}

if (models.plant) {
    const plant = prepareGltf(models.plant, { height: 0.42, yaw: 0.5 });
    plant.position.set(-0.78, topY, -0.12);
    scene.add(plant);
}

if (models.snake) {
    const snake = prepareGltf(models.snake, { height: 0.6, yaw: -0.3 });
    snake.position.set(1.62, 0, -0.5);
    scene.add(snake);
}

if (models.clock) {
    const clock = prepareGltf(models.clock, { maxSize: 0.3, yaw: 0, center: true });
    addInteractive(clock, new THREE.Vector3(1.3, 1.84, WALL_Z + 0.05), { lift: 0.01, spin: 0.03 });
}

if (models.notebook) {
    const notebook = prepareGltf(models.notebook, { maxSize: 0.26, yaw: -0.35 });
    notebook.position.set(0.46, topY, 0.19);
    scene.add(notebook);
}

if (models.penCup) {
    const penCup = prepareGltf(models.penCup, { height: 0.115, yaw: 0.4 });
    penCup.position.set(0.88, topY, -0.04);
    scene.add(penCup);
}

if (models.notepads) {
    const notepads = prepareGltf(models.notepads, { maxSize: 0.2, yaw: 0.25 });
    notepads.position.set(-0.3, topY, 0.25);
    scene.add(notepads);
}

if (models.books) {
    const books = prepareGltf(models.books, { height: 0.17, yaw: 0.9 });
    books.position.set(-1.3, 0, 0.18);
    scene.add(books);
}

// variação opcional: notebook retrô (assets/models/classic-laptop.glb) via ?retro=1
if (params.has('retro') && models.retroLaptop) {
    laptopEntry.root.visible = false;
    const retro = prepareGltf(models.retroLaptop, { maxSize: 0.46, yaw: 0.35 });
    retro.position.set(-0.14, topY, 0.02);
    scene.add(retro);
}

// ---------- interações ----------
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(0, 0);
const parallax = { x: 0, y: 0 };
let pointerActive = false;
let hovered = null;

window.addEventListener('pointermove', (event) => {
    pointer.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    pointerActive = true;
});

window.addEventListener('pointerleave', () => {
    pointerActive = false;
    pointer.set(0, 0);
});

const interactiveRoots = interactives.map((entry) => entry.root);

function findEntry(object) {
    let node = object;
    while (node) {
        const entry = interactives.find((item) => item.root === node);
        if (entry) return entry;
        node = node.parent;
    }
    return null;
}

function updateHover() {
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(interactiveRoots, true);
    const entry = hits.length ? findEntry(hits[0].object) : null;
    if (entry !== hovered) {
        hovered = entry;
        canvas.style.cursor = entry ? 'pointer' : '';
    }
}

// ---------- ciclo de animação ----------
const clock = new THREE.Clock();
let elapsed = 0;

if (!reducedMotion) {
    let cursorOn = true;
    window.setInterval(() => {
        cursorOn = !cursorOn;
        textures.screen.draw(cursorOn);
    }, 640);
}

function animate() {
    const delta = Math.min(clock.getDelta(), 0.05);
    elapsed += delta;

    if (!reducedMotion) {
        parallax.x += (pointer.x * (pointerActive ? 1 : 0) - parallax.x) * Math.min(1, delta * 4);
        parallax.y += (pointer.y * (pointerActive ? 1 : 0) - parallax.y) * Math.min(1, delta * 4);

        camera.position.copy(baseCameraPos)
            .addScaledVector(camRight, parallax.x * 0.05)
            .addScaledVector(camUp, parallax.y * 0.03);
        camera.lookAt(cameraTarget);

        updateHover();

        for (const sprite of steam.children) {
            const cycle = (elapsed * sprite.userData.speed + sprite.userData.offset) % 1;
            sprite.position.y = sprite.userData.baseY + cycle * 0.13;
            sprite.material.opacity = 0.26 * Math.sin(cycle * Math.PI);
        }
    }

    for (const entry of interactives) {
        const target = entry === hovered ? 1 : 0;
        entry.current += (target - entry.current) * Math.min(1, delta * 9);
        entry.inner.position.y = entry.current * entry.lift;
        entry.inner.rotation.z = entry.current * entry.spin;
        entry.root.scale.setScalar(1 + entry.current * 0.02);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateCameraFrustum();
});

if (loaderFill) loaderFill.style.width = '100%';
requestAnimationFrame(() => {
    requestAnimationFrame(() => document.body.classList.add('is-ready'));
});

animate();
