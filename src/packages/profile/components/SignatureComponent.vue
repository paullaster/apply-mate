<template>
    <v-container class="my-5">
      <h2 class="text-center">Scribble Signature</h2>
  
      <canvas ref="signatureCanvas" width="400" height="200"></canvas>
  
      <v-btn color="primary" @click="clearSignature">Clear</v-btn>
      <v-btn color="success" @click="downloadSignature">Download</v-btn>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const signatureCanvas = ref(null);
  const context = ref(null);
  
  onMounted(() => {
    context.value = signatureCanvas.value.getContext('2d');
  });
  
  const isDrawing = ref(false);
  const lastX = ref(0);
  const lastY = ref(0);
  
  const startDrawing = (event) => {
    isDrawing.value = true;
    lastX.value = event.offsetX;
    lastY.value = event.offsetY;
  };
  
  const draw = (event) => {
    if (!isDrawing.value) return;
  
    context.value.beginPath();
    context.value.moveTo(lastX.value, lastY.value);
    context.value.lineTo(event.offsetX, event.offsetY);
    context.value.stroke();
  
    lastX.value = event.offsetX;
    lastY.value = event.offsetY;
  };
  
  const stopDrawing = () => {
    isDrawing.value = false;
  };
  
  const clearSignature = () => {
    context.value.clearRect(0, 0, signatureCanvas.value.width, signatureCanvas.value.height);
  };
  
  const downloadSignature = () => {
    const link = document.createElement('a');
    link.href = signatureCanvas.value.toDataURL('image/png');
    link.download = 'signature.png';
    link.click();
  };
  </script>