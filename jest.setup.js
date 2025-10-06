// jest.setup.js
// This file runs before all tests

// Import jest-dom matchers
import "@testing-library/jest-dom";

// Mock window.scrollY
Object.defineProperty(window, "scrollY", {
  writable: true,
  configurable: true,
  value: 0,
});

// Mock window.innerHeight
Object.defineProperty(window, "innerHeight", {
  writable: true,
  configurable: true,
  value: 768,
});

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = jest.fn(function () {
  return {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => {},
  };
});

// Suppress console errors during tests (optional)
// global.console.error = jest.fn();
// global.console.warn = jest.fn();
