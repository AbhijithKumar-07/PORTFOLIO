// toggle icon navbar

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}


// scroll sections
let sections = document.querySelectorAll('section');
let navLinkS = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;  // The offsetTop property returns the top position (in pixels) relative to the parent.
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinkS.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');

                });
           
            // active sections for animation on scroll

            sec.classList.add("show-animate");

        }

        // if want to use Animation that repeats on scroll use this

        else {
            sec.classList.remove("show-animate");
        }

    });

    // sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // Animation footer on scroll
let footer = document.querySelector('footer');

// Get the position of the footer relative to the viewport
let footerPosition = footer.getBoundingClientRect().top;

// Toggle the 'show-animate' class based on the footer's position
footer.classList.toggle('show-animate', footerPosition < window.innerHeight);

}




                /*
The * in the attribute selector ([href*='value']) is a wildcard character in CSS that is used to select elements where the specified attribute contains a specific substring (in this case, 'value').

So, href*='value' will select elements where the href attribute contains the specified substring 'value'.
The * acts as a wildcard, allowing for partial matches.

For example, if you have an anchor (<a>) element with an href attribute like this:

html
Copy code
<a href="some-value">Link</a>
Using [href*='value'] will select this anchor element because the href attribute contains the substring 'value'.
The * wildcard makes it match even if there are other characters before or after 'value' in the attribute value.

Example : <a href="#idname">Link</a>

Now to select this # in the href we use * Universal Selector

                */