"use client";

import { useEffect } from "react";

export function ImageResizeHandler() {
  useEffect(() => {
    let selectedImage: HTMLImageElement | null = null;
    let resizeHandles: HTMLDivElement | null = null;
    let isResizing = false;
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;

    const handleImageClick = (e: Event) => {
      const target = e.target as HTMLImageElement;
      if (target.tagName === 'IMG') {
        selectImage(target);
      }
    };

    const selectImage = (img: HTMLImageElement) => {
      // Remove previous selection
      if (selectedImage) {
        selectedImage.classList.remove('selected');
      }
      if (resizeHandles) {
        resizeHandles.remove();
      }

      selectedImage = img;
      img.classList.add('selected');
      
      // Create resize handles
      createResizeHandles(img);
    };

    const createResizeHandles = (img: HTMLImageElement) => {
      const rect = img.getBoundingClientRect();
      const container = img.closest('.w-md-editor-preview');
      if (!container) return;

      resizeHandles = document.createElement('div');
      resizeHandles.className = 'image-resize-handles';
      resizeHandles.style.left = `${rect.left - container.getBoundingClientRect().left}px`;
      resizeHandles.style.top = `${rect.top - container.getBoundingClientRect().top}px`;
      resizeHandles.style.width = `${rect.width}px`;
      resizeHandles.style.height = `${rect.height}px`;

      // Create corner handles
      ['nw', 'ne', 'sw', 'se'].forEach(corner => {
        const handle = document.createElement('div');
        handle.className = `image-resize-handle ${corner}`;
        handle.addEventListener('mousedown', (e) => startResize(e, corner, img));
        resizeHandles!.appendChild(handle);
      });

      container.appendChild(resizeHandles);
    };

    const startResize = (e: MouseEvent, corner: string, img: HTMLImageElement) => {
      e.preventDefault();
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = img.offsetWidth;
      startHeight = img.offsetHeight;

      document.addEventListener('mousemove', (e) => handleResize(e, corner, img));
      document.addEventListener('mouseup', stopResize);
    };

    const handleResize = (e: MouseEvent, corner: string, img: HTMLImageElement) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;

      if (corner.includes('e')) newWidth = startWidth + deltaX;
      if (corner.includes('w')) newWidth = startWidth - deltaX;
      if (corner.includes('s')) newHeight = startHeight + deltaY;
      if (corner.includes('n')) newHeight = startHeight - deltaY;

      // Maintain aspect ratio
      const aspectRatio = startWidth / startHeight;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        newHeight = newWidth / aspectRatio;
      } else {
        newWidth = newHeight * aspectRatio;
      }

      // Apply constraints
      newWidth = Math.max(50, Math.min(800, newWidth));
      newHeight = Math.max(50, Math.min(600, newHeight));

      img.style.width = `${newWidth}px`;
      img.style.height = `${newHeight}px`;

      // Update handles position
      if (resizeHandles) {
        resizeHandles.style.width = `${newWidth}px`;
        resizeHandles.style.height = `${newHeight}px`;
      }
    };

    const stopResize = () => {
      isResizing = false;
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
    };

    const handleClickOutside = (e: Event) => {
      const target = e.target as HTMLElement;
      if (selectedImage && !selectedImage.contains(target) && !target.closest('.image-resize-handles')) {
        selectedImage.classList.remove('selected');
        if (resizeHandles) {
          resizeHandles.remove();
          resizeHandles = null;
        }
        selectedImage = null;
      }
    };

    // Add event listeners
    document.addEventListener('click', handleImageClick);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleImageClick);
      document.removeEventListener('click', handleClickOutside);
      if (resizeHandles) {
        resizeHandles.remove();
      }
    };
  }, []);

  return null;
}