// Core Energy Sphere Shader
// Creates glowing, pulsating core with energy field effects

uniform float uTime;
uniform float uIntensity;
uniform float uEnergy;
uniform float uBass;
uniform float uTreble;
uniform vec3 uColor;

varying vec3 vPosition;
varying vec3 vNormal;
varying float vDepth;

#ifdef GL_FRAGMENT_SHADER

void main() {
    // Normalize coordinates
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vPosition);
    
    // Create pulsating glow
    float glow = sin(uTime * 2.0 + uEnergy * 10.0) * 0.5 + 0.5;
    glow = mix(0.5, 1.0, glow);
    
    // Add bass reactivity (brightness)
    glow *= 0.8 + uBass * 0.2;
    
    // Create energy waves
    float wave = sin(length(vPosition) * 5.0 - uTime * 3.0) * 0.5 + 0.5;
    wave *= uTreble;
    
    // Fresnel effect
    float fresnel = pow(1.0 - dot(normal, viewDir), 3.0);
    
    // Combine effects
    vec3 finalColor = uColor * (glow + wave * 0.3);
    float alpha = (glow + fresnel * 0.5) * uIntensity;
    
    gl_FragColor = vec4(finalColor, alpha);
}

#else

void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vDepth = length(position);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

#endif