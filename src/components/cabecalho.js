const checkbox = document.getElementById('tema');
        const solImg = document.getElementById('sol');
        const luaImg = document.getElementById('lua');
        const html = document.querySelector("html");

        checkbox.addEventListener('change', function() {
            html.classList.toggle("dark");

            if (checkbox.checked) {
                solImg.style.opacity = '0';
                luaImg.style.opacity = '1';
            } else {
                solImg.style.opacity = '1';
                luaImg.style.opacity = '0';
            }
        });