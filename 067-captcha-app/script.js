"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  let captchaText = "";
  const captchaStatus = document.querySelector(".captcha-status");
  const btnCheckCaptcha = document.querySelector(".check-captcha");
  const btnReloadCaptcha = document.querySelector(".reload-captcha");
  let inputText = document.querySelector(".captcha-input");

  function verifyCaptcha() {
    btnReloadCaptcha.setAttribute("disabled", true);
    btnCheckCaptcha.setAttribute("disabled", true);
    if (inputText.value.toLowerCase() === captchaText.toLowerCase()) {
      captchaStatus.textContent = "Captcha Correct";
      captchaStatus.style.color = "green";
    } else if (inputText.length < 6) {
      captchaStatus.textContent = "Enter all characters";
      captchaStatus.style.color = "red";
    } else {
      captchaStatus.textContent = "Captcha incorrect. Please try again";
      captchaStatus.style.color = "red";
    }
    setTimeout(() => {
      captchaStatus.textContent = "Status: IDLE";
      captchaStatus.style.color = "black";
      btnReloadCaptcha.removeAttribute("disabled");
      btnCheckCaptcha.removeAttribute("disabled");
    }, 2000);
    inputText.value = "";
    captchaText = generateCaptchaText();
    redrawCaptcha(captchaText);
  }

  function redrawCaptcha() {
    captchaText = generateCaptchaText(6);
    drawCaptcha(captchaText);
  }

  function generateCaptchaText(length = 6) {
    let result = "";
    const vocabulary =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    const vocLength = vocabulary.length;
    for (let i = 0; i < length; i++) {
      result += vocabulary.charAt(Math.floor(Math.random() * vocLength));
    }
    return result;
  }

  function drawCaptcha(text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f3f3f3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    addNoise(ctx);
    ctx.fillStyle = "#06108c";
    ctx.font = "24px Arial";
    const textWidth = ctx.measureText(text).width;
    const startX = (canvas.width - textWidth) / 3;
    for (let i = 0; i < text.length; i++) {
      ctx.save();
      ctx.translate(startX + i * 20, 30);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
  }

  function addNoise(context) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 1) {
      const color = Math.random() > 0.5 ? 255 : 0;
      pixels[i] = pixels[i + 1] = pixels[i + 2] = color;
    }
    context.putImageData(imageData, 0, 0);
  }

  btnCheckCaptcha.addEventListener("click", verifyCaptcha);
  btnReloadCaptcha.addEventListener("click", () => {
    redrawCaptcha();
    inputText.value = "";
    captchaStatus.textContent = "Status: IDLE";
  });

  drawCaptcha(generateCaptchaText());
});
