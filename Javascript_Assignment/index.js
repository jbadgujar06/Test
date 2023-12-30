var outsideClick = function (e) {
  var container = document.querySelector(".customDrp");
  if (
    !container.is(e.target) &&
    container.has(e.target).length === 0 &&
    container.is(":visible")
  ) {
    container.classList.remove("active");
    document.removeEventListener("click", outsideClick);
  }
};

var crossStringClick = function (ele) {
  var target = ele;
  var parentWithActiveClass = target.closest(".active");
  if (parentWithActiveClass) {
    parentWithActiveClass.classList.remove("active");
  }
};
var searchstandard = "";
(function () {
  fetch("/data/v1/json/trending", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res) return;

      populateTrendingSearch1(res);
      populateTrendingSearch2(res);
    })
    .catch((error) => console.log(error));
})();

var buttonElement = document.querySelector(".active");
buttonElement.addEventListener("click", function (event) {
  crossStringClick(event.target);
});

function populateTrendingSearch1(res) {
  res.forEach(function (data, index) {
    var div = document.createElement("div");
    div.className =
      "commonFlex content Between itemscenter spacer positionRelative";
    var link = document.createElement("a");
    link.href = `${CURRLANG}currencies/${data.slug}/`;
    link.className = "positonedLink";
    var leftDiv = document.createElement("div");
    leftDiv.className = "left commonFlex itemcenter";
    var img = document.createElement("img");
    img.src = `/assets/currencies/32x32/${data.id}.png`;
    img.alt = "";
    var titleDiv = document.createElement("div");
    titleDiv.className = "title";
    titleDiv.textContent = data.name;
    var span = document.createElement("span");
    span.textContent = data.symbol;
    var rightDiv = document.createElement("div");
    var small = document.createElement("small");
    small.textContent = `#${data.rank}`;
    rightDiv.appendChild(small);
    leftDiv.appendChild(img);
    leftDiv.appendChild(titleDiv);
    leftDiv.appendChild(span);
    div.appendChild(link);
    div.appendChild(leftDiv);
    div.appendChild(rightDiv);
    var container = document.getElementById("container");
    container.appendChild(div);
  });
}
//below code already in javascript no need to convert it
var searchToken = function (e) {
  var skey = e.target.value;
  fetch("/data/v1/json/search?key=" + encodeURIComponent(skey), {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      buildSearchList(e.target.id, skey, res);
    })
    .catch((error) => console.log(error));
};

var clearSearch = function (id) {
  document.getElementById(id).value = "";
  buildSearchList(id, "", []);
};

function buildSearchList(resid, skey, list) {
  var output = null;
  if (resid == "tokensearch1") {
    outputbox = "searchresbox1";
  } else {
    outputbox = "searchresbox2";
  }

  if (searchstandard == "") {
    searchstandard = document.getElementById(outputbox).innerHTML;
  }

  if (skey == "") {
    document.getElementById(outputbox).innerHTML = searchstandard;
    return false;
  }
  if (list.length == 0) {
    document.getElementById(outputbox).innerHTML =
      `<div class="search_noresults"><p>No results for '` +
      skey +
      `'</p><p>We couldn't find anything matching your search. Try again with a different term.</p></div>`;
    return false;
  }
  var html = "<p>Cryptocurrencies</p>";
  html += '<div class="Listingdiv hide-overflow-line">';
  list.forEach(function (data, index) {
    var div = document.createElement("div");
    div.className =
      "commonFlex contentBetween itemscenter spacer positionRelative";
    var link = document.createElement("a");
    link.href = `${CURRLANG}currencies/${data.slug}/`;
    link.className = "positonedLink";
    var leftDiv = document.createElement("div");
    leftDiv.className = "left commonFlex itemscenter";
    var img = document.createElement("img");
    img.className = "rounder-8";
    img.src = `/assets/currencies/64x64/${data.id}.png`;
    img.alt = "";
    var titleDiv = document.createElement("div");
    titleDiv.className = "title";
    titleDiv.textContent = data.name;
    var span = document.createElement("span");
    span.textContent = data.symbol;
    var rightDiv = document.createElement("div");
    var small = document.createElement("small");
    small.textContent = `#${data.rank}`;
    rightDiv.appendChild(small);
    leftDiv.appendChild(img);
    leftDiv.appendChild(titleDiv);
    leftDiv.appendChild(span);
    div.appendChild(link);
    div.appendChild(leftDiv);
    div.appendChild(rightDiv);
    html += div.outerHTML;
    document.getElementById(outputbox).innerHTML = html;
  });
}
(function () {
  window.scrollTo(0, 0);

  document.querySelectorAll(".menuIcon").forEach(function (menuIcon) {
    menuIcon.addEventListener("click", function () {
      document.querySelector(".headerMain").classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  document.querySelectorAll(".CloseMenu").forEach(function (closeMenu) {
    closeMenu.addEventListener("click", function () {
      document.querySelector(".headerMain").classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      const customPopupActive = document.querySelector(".customPopup.active");
      if (customPopupActive != null) {
        customPopupActive.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    }
  });
  document
    .getElementById("tokensearch1")
    .addEventListener("input", searchToken);
  document
    .getElementById("tokensearch2")
    .addEventListener("input", searchToken);
})();
document.addEventListener("DOMContentLoaded", function () {
  var elements = document.querySelectorAll("custmonDropDwon");
  elements.forEach(function (element) {
    element.addEventListener("click", function (e) {
      if (
        e.target.classList.contais("crossString") ||
        e.target.classList.contais("bowiro")
      ) {
        return false;
      }
      if (e.target.tagName.toLowerCase() == "a") {
        return true;
      }
      e.preventDefault();

      console.log(e.target);
      if (
        e.target.classList.contais("language") ||
        e.target.parent.classList.contais("language")
      ) {
        languageFunc();
      }
    });
  });
});
if (window.matchMedia("(max-width: 1170px)").matches) {
  document.body.style.overflow = "hidden";
}
