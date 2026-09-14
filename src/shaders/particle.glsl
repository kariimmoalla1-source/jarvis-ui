// Particle System Shader
// Creates audio-reactive particle effects with trails

uniform float uTime;
uniform float uEnergy;
uniform float uBass;
uniform float uMid;
uniform float uTreble;
uniform sampler2D uTexture;

varying vec3 vColor;
varying float vAlpha;

#ifdef GL_FRAGMENT_SHADER

void main() {
    // Create circular particle with soft edges
    vec2 center = gl_PointCoord - vec2(0.5);
    float distance = length(center);
    
    if (distance > 0.5) {
        discard;
    }
    
    // Soft falloff
    float alpha = (1.0 - distance * 2.0) * vAlpha;
    
    gl_FragColor = vec4(vColor, alpha);
}

#else

attribute float aLife;
attribute vec3 aVelocity;

varying vec3 vColor;
varying float vAlpha;

void main() {
    // Oscillate position based on energy
    vec3 pos = position;
    pos += aVelocity * uEnergy * 2.0;
    pos += sin(uTime + aLife) * vec3(
        uBass * 0.5,
        uMid * 0.3,
        uTreble * 0.2
    );
    
    // Calculate color based on lifecycle
    float lifecycle = mod(aLife + uTime * 0.5, 1.0);
    vColor = mix(
        vec3(0.0, 1.0, 0.5),  // Green (birth)
        vec3(1.0, 0.0, 0.5),  // Magenta (death)
        lifecycle
    );
    
    // Fade in and out
    vAlpha = sin(lifecycle * 3.14159) * (1.0 - lifecycle);
    
    gl_PointSize = 4.0 + uEnergy * 8.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

#endif