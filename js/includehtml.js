function home(){
    const url = `${frontend_base_url}home.html`
    location.href=url
}

function autoPaint(){
    const url = `${frontend_base_url}auto_paint.html`
    location.href=url
}

function community(){
    const url = `${frontend_base_url}community.html`
    location.href=url
}

function profileButton(user_id){
    if(user_id == null){
        alert('로그인해주세요')
    }else{
        const url = `${frontend_base_url}profile.html?id=${user_id}`
        location.href=url
    }
}

function userinfoButton(user_id){
    if(user_id == null){
        alert('로그인해주세요')
    }else{
        const url = `${frontend_base_url}user_info.html?id=${user_id}`
        location.href=url
    }
}

function signinupButton(){
    const url = `${frontend_base_url}sign_in_up.html`
    location.href=url
}

async function checkLogin() {
    const name = await getName()

    const loginoutButton = document.getElementById("loginout")
    loginoutButton.innerText = ''

    if(name == null){
        loginoutButton.innerText = "로그인/회원가입"
        loginoutButton.setAttribute("onclick", "location.href=`${frontend_base_url}sign_in_up.html`") 
    }else{
        loginoutButton.innerText = "로그아웃"
        loginoutButton.setAttribute("onclick", "logout()")
    }
}

async function dropdawn(){
    var payload = localStorage.getItem("payload")
    var parsed_payload = await JSON.parse(payload)

    if(parsed_payload != null){
        const user_id = parsed_payload.user_id
        const user = await getProfile(user_id)

        const dropdownProfileImage = document.getElementById("dropdown_profile_image")
        dropdownProfileImage.setAttribute("src", `${backend_base_url}${user.profile_img}`)
        
        const dropdownUsername = document.getElementById("dropdown_username")
        dropdownUsername.innerText = user.username + '님, '

        const profile = document.getElementById("profile")
        profile.setAttribute("id", `${user.id}`)
        profile.setAttribute("onclick", "profileButton(this.id)")

        const userinfo = document.getElementById("user_info")
        userinfo.setAttribute("id", `${user.id}`)
        userinfo.setAttribute("onclick", "userinfoButton(this.id)")
    }
}

function includehtml(callback) {
    var z, i, elmnt, file, xhr;

    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("include-html");

        if (file) {
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    elmnt.removeAttribute("include-html");
                    includehtml(callback);
                }
            };
            xhr.open("GET", file, true);
            xhr.send();
            return;
        }
    }

        checkLogin()
        dropdawn()

    setTimeout(function () {
    }, 0);
}
