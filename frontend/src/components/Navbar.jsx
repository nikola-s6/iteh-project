import "./Navbar.css"

function Navbar({}) {
    return (
        <div class="sidebar_wrapper">
        <div class="navbar__menu_icons">
            <picture>
                <img class="navbar__logo_image" src="../images/logo.png" alt="site logo"/>
                <img class="navbar__logo_image_small" src="../images/instagram-pic.png" alt="site logo small"/>
            </picture>
            
            <a class="navbar__menu_option" href="#">
                <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24"
                >
                    <path d="M3 10v11h6v-7h6v7h6v-11L12,3z"/>
                </svg>
                    <p class="navbar__tab_name">Home</p>
            </a>
        
            <a class="navbar__menu_option navbar__profile_icon" href="#">
                <svg
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24"    
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                  
                >
                    <circle  cx="12" cy="8" r="5" />
                    <path d="M3,21 h18 C 21,12 3,12 3,21"/>
                </svg>
                <p class="navbar__tab_name">Profile</p>
            </a>

        </div>
        <div class="navbar__menu_search_wrapper">
            <a class="navbar__menu_option" href="#">
                <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24"
                >
                    <path fill="none" d="M0 0h24v24H0V0z"/>
                    <path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <p class="navbar__tab_name">Search</p>
            </a>
            <input class="navbar__menu_search_input" type="text" placeholder="Search..."/>
        </div>
    </div>
    )
  }