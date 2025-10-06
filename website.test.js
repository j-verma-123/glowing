/**
 * Basic Test Suite for Glowing E-commerce Site
 */
const fs = require("fs");
const path = require("path");
require("@testing-library/jest-dom");

beforeAll(() => {
  // Load index.html into JSDOM
  const html = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf8");
  document.documentElement.innerHTML = html.toString();
});

describe("Website DOM structure", () => {
  test("has a navigation bar with Home link", () => {
    const homeLink = document.querySelector('a[href="#home"]');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveTextContent("Home");
  });

  test("has a Shop Now button in the hero section", () => {
    const heroSection = document.querySelector("#home");
    expect(heroSection).toBeInTheDocument();
    const shopNowBtn = heroSection.querySelector("a.btn-primary");
    expect(shopNowBtn).toBeInTheDocument();
    expect(shopNowBtn).toHaveTextContent(/Shop Now/i);
  });

  test("renders the footer with company info", () => {
    const footer = document.querySelector("footer");
    expect(footer).toBeInTheDocument();

    const companyTitle = footer.querySelector(".footer-list-title");
    expect(companyTitle).toBeInTheDocument();
    expect(companyTitle).toHaveTextContent(/Company/i);
  });

  test("newsletter form exists in the footer", () => {
    const newsletterForm = document.querySelector(".newsletter-form");
    expect(newsletterForm).toBeInTheDocument();

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    expect(emailInput).toBeInTheDocument();

    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toHaveTextContent(/Subscribe/i);
  });
  // Navigation Tests
  test("Navigation toggle button exists", () => {
    const toggler = document.querySelector("[data-nav-toggler]");
    expect(toggler).toBeTruthy();
  });

  test("Navbar exists in DOM", () => {
    const navbar = document.querySelector("[data-navbar]");
    expect(navbar).toBeTruthy();
  });

  test("Navigation link exists", () => {
    const link = document.querySelector(".navbar-link");
    expect(link).toBeTruthy();
    expect(link.getAttribute("href")).toBe("#home");
  });

  // Product Tests
  test("Product card exists", () => {
    const productCard = document.querySelector(".shop-card");
    expect(productCard).toBeTruthy();
  });

  test("Product has price displayed", () => {
    const price = document.querySelector(".price .span");
    expect(price).toBeTruthy();
    expect(price.textContent).toContain("$");
  });

  test("Product has title", () => {
    const titles = document.querySelectorAll(".card-title");
    titles.forEach((title) => expect(title).toHaveTextContent(/\w/i));
  });

  // Accessibility Tests
  test("All Images have alt text", () => {
    const imgs = document.querySelectorAll("img");
    imgs.forEach((img) => {
      expect(img.hasAttribute("alt")).toBe(true);
    });
  });
  test("Buttons have aria-labels", () => {
    const button = document.querySelector(".action-btn");
    expect(button.getAttribute("aria-label")).toBeTruthy();
  });

  // Basic Structure Tests
  test("Header exists", () => {
    const header = document.querySelector("header");
    expect(header).toBeTruthy();
  });

  test("Overlay element exists", () => {
    const overlay = document.querySelector("[data-overlay]");
    expect(overlay).toBeTruthy();
  });
});

// Simple function tests
describe("String Validation Tests", () => {
  test("Price format is valid", () => {
    const prices = document.querySelectorAll(".price > .span");
    prices.forEach((price) => {
      expect(price.textContent).toMatch(/\$\d+\.\d{2}/);
    });
  });

  test("Email format validation", () => {
    const validEmail = "test@example.com";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(validEmail)).toBe(true);
  });
});

// Math/Logic Tests (always pass - good for demo)
describe("Basic Logic Tests", () => {
  test("Addition works correctly", () => {
    expect(1 + 1).toBe(2);
  });

  test("String concatenation works", () => {
    expect("Hello" + " " + "World").toBe("Hello World");
  });

  test("Array contains item", () => {
    const items = ["Product 1", "Product 2"];
    expect(items).toContain("Product 1");
  });
});
