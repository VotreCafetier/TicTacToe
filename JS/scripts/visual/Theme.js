const ChangeTheme = () =>{
    const head = document.head;
    let whitetheme = document.createElement('link');
    Object.assign(whitetheme, {
        href: 'css/WhiteTheme.css',
        rel: 'stylesheet'
    })

    let darktheme = document.createElement('link');
    Object.assign(darktheme, {
        href: 'css/DarkTheme.css',
        rel: 'stylesheet'
    })

    const query = head.querySelectorAll('link');
    head.innerHTML.includes('href="css/WhiteTheme.css"')?query[query.length-2].replaceWith(darktheme):query[query.length-2].replaceWith(whitetheme);
}

(()=>{
    // Assign to a btn here
})();