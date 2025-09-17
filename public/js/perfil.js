document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('aside-lateral');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Fecha a sidebar ao clicar fora dela e do botão hamburger
    document.addEventListener('click', function(event) {
        if (!event.target.closest('#aside-lateral') &&
            !event.target.closest('.menu-toggle') &&
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('tema');
    const sol = document.getElementById('sol');
    const lua = document.getElementById('lua');

    if (themeToggle && sol && lua) {
        themeToggle.addEventListener('change', function() {
            document.body.classList.toggle('dark');

            if (this.checked) {
                sol.style.opacity = '0';
                lua.style.opacity = '1';
            } else {
                sol.style.opacity = '1';
                lua.style.opacity = '0';
            }
        });
    }
});


    const form = document.getElementById ("form");
    const button = document.getElementById ("bt")
    const campos = document.querySelectorAll (".req");
    const spans = document.querySelectorAll (".sp");

    button.addEventListener ("click", (event) => 
    {
        event.preventDefault();
        nameValidate();
        sobreValidate();
    });
    

    

    function setError(index)
    {
        campos[index].style.border = "2px solid #e63636";
        spans[index].style.display = "block";
    }

    function removeError (index)
    {
        campos[index].style.border = "";
        spans[index].style.display = "none";
    }

    function nameValidate()
    {
        if(campos[0].value.length < 3)
        {
            setError(0);
        }
        else
        {
            removeError(0);
        }
    }


     function sobreValidate()
    {
        if(campos[1].value.length < 3)
        {
            setError(1);
        }
        else
        {
            removeError(1);
        }
    }
