// Energy Field Shader
// Creates flowing energy beams and field effects

uniform float uTime;
uniform float uEnergy;
uniform float uBass;
uniform float uPeak;

varying vec3 vPosition;
varying vec3 vNormal;

#ifdef GL_FRAGMENT_SHADER

void main() {
    vec3 normal = normalize(vNormal);
    
    // Create flowing energy pattern
    float flow = sin(vPosition.y * 10.0 - uTime * 2.0) * 0.5 + 0.5;
    
    // Add energy reactivity
    float energyIntensity = uEnergy + uBass * 0.5;
    
    // Create wave effect from peaks
    float wave = abs(sin(length(vPosition.xz) * 5.0 - uTime * 3.0 + uPeak * 10.0));
    
    // Combine with normal for lighting
    float light = dot(normal, vec3(0.0, 1.0, 0.0));
    float intensity = flow * energyIntensity + wave * 0.3;
    
    // Color gradient based on energy
    vec3 color = mix(
        vec3(0.0, 1.0, 0.5),  // Cool green
        vec3(1.0, 0.0, 0.5),  // Hot magenta
        energyIntensity
    );
    
    gl_FragColor = vec4(color * intensity, intensity * 0.8);
}

#else

void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

#endif