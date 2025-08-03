document.addEventListener("DOMContentLoaded", function () {
    //First Icon Click Event
    let sidebarTrigger1 = document.getElementById("sidebarTrigger1");
    let sidebarNav1 = document.getElementById("sidebarNav1");
    sidebarTrigger1.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent event propagation to the document
        toggleSidebar(sidebarNav1);
    });

    //Second Icon Click Event
    let sidebarTrigger2 = document.getElementById("sidebarTrigger2");
    let sidebarNav2 = document.getElementById("sidebarNav2");
    sidebarTrigger2.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent event propagation to the document
        toggleSidebar(sidebarNav2);
    });

    // Funtion to Toggle Sidebar
    function toggleSidebar(sidebar) {
        if (sidebar.classList.contains("show")) {
            sidebar.classList.remove("show");
        } else {
            sidebar.classList.add("show");
        };
    };

    //Close Button Click Event for Sidebar1
    let closeBtn1 = document.querySelector("#sidebarNav1 .btn-close");
    closeBtn1.addEventListener("click", function () {
        sidebarNav1.classList.remove("show");
    });

    //Close Button Click Event for Sidebar2
    let closeBtn2 = document.querySelector("#sidebarNav2 .btn-close");
    closeBtn2.addEventListener("click", function () {
        sidebarNav2.classList.remove("show");
    });

    // Close Sidebar When Clicking Outside
    document.addEventListener("click", function (e) {
      var target = e.target;
      var sidebar1 = document.getElementById("sidebarNav1");
      var sidebar2 = document.getElementById("sidebarNav2");

      if (target !== sidebarTrigger1 && !sidebar1.contains(target)) {
        sidebar1.classList.remove("show");
      }

      if (target !== sidebarTrigger2 && !sidebar2.contains(target)) {
        sidebar2.classList.remove("show");
      }
    });

    // Close Sidebar When Clicking Escape
    document.addEventListener("keydown", function (e) {
        let sidebar1 = document.getElementById("sidebarNav1");
        let sidebar2 = document.getElementById("sidebarNav2");

        if (e.key === 'Escape') {
            sidebar1.classList.remove("show");
            sidebar2.classList.remove("show");
        }
    });

});

