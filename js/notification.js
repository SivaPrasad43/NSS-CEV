// Fetch data
let data, notificationList, eventList;

async function getInfo() {
  let res = await fetch("./db/notification.json");
  if (res.ok) {
    data = await res.json();
    notificationList = data.notification;
    eventList = data.events;
    disNotifi(notificationList);
    disEvent(eventList);
  } else {
    console.log("Sorry couldn't load data :(");
  }
}
getInfo();

// Get Parent Element
let notif = document.querySelector("#notification");
// create a main accordion
let accordion = document.createElement("div");
accordion.className = "accordion";

function disNotifi(data) {
  data.forEach((element, index) => {
    // create accordion item

    let accordion_item = document.createElement("div");
    accordion_item.className = "accordion-item";
    // create accordion header

    let accordion_header = document.createElement("div");
    accordion_header.className = "accordion-header";
    // create Accordion button

    let accordion_button = document.createElement("button");
    index == 0
      ? (accordion_button.className = "accordion-button")
      : (accordion_button.className = "accordion-button collapsed");
    accordion_button.dataset.tigger = index;

    accordion_button.addEventListener("click", (e) => {
      let list = document.querySelectorAll("[data-point]");
      let Btn = document.querySelectorAll("[data-tigger]");
      list.forEach((el) => {
        if (el.dataset.point == e.target.dataset.tigger) {
          el.classList.toggle("show");
        } else {
          el.classList.remove("show");
        }
      });
      Btn.forEach((el) => {
        if (el.dataset.tigger == e.target.dataset.tigger)
          el.classList.remove("collapsed");
        else el.classList.add("collapsed");
      });
    });

    // create accordion collapse
    let accordion_collapse = document.createElement("div");
    index == 0
      ? (accordion_collapse.className = "accordion-collapse collapse show")
      : (accordion_collapse.className = "accordion-collapse collapse");
    accordion_collapse.id = index;
    accordion_collapse.dataset.point = index;

    // create accordion body
    let accordion_body = document.createElement("div");
    accordion_body.className = "accordion-body";

    let notifi_title = document.createElement("div");
    notifi_title.className = "notifi_title";
    // Create date
    let date = document.createElement("div");
    date.className = "date";
    date.textContent = element.date;

    accordion_body.textContent = element.content;
    accordion_collapse.append(accordion_body);

    let accordion_title = document.createElement("h5");
    accordion_title.className = "accordion_title";
    accordion_title.textContent = element.title;
  
    accordion_button.append(notifi_title);
    notifi_title.append(accordion_title);
    notifi_title.append(date);

    accordion_header.append(accordion_button);

    accordion_item.append(accordion_header, accordion_collapse);
    accordion.append(accordion_item);
  });
  notif.append(accordion);
}
// Select Event section
let eventSection = document.querySelector("#events");

function disEvent(data) {
  data.forEach((element) => {
    // Create card
    let card = document.createElement("div");
    card.className = "card";

    let img_wrap = document.createElement("div");
    img_wrap.className="img_wrap";

    // create card-img
    let card_img = document.createElement("img");
    card_img.src = element.img;
    card_img.alt = element.title;

    // create card-title
    let card_title = document.createElement("h4");
    card_title.className = "card-title";
    card_title.textContent = element.title;

    // create card-body
    let card_body = document.createElement("div");
    card_body.className = "card-body";
    // create card-text
    let card_text = document.createElement("span");
    card_text.className = "badge rounded-pill bg-warning text-dark my-1";
    card_text.textContent = element.content;
    //deadline
    let card_date = document.createElement("p");
    card_date.className = "card-date";
    card_date.textContent = element.date;

    // create a button
    let card_btn = document.createElement("a");
    if (element.status == "closed") {
      card_btn.className = "btn btn-danger disabled";
      card_btn.textContent = "Closed";
      card_btn.href = "#";
    } else {
      card_btn.className = "reg-btn btn btn-primary";
      card_btn.textContent = "Register";
      card_btn.href = element.link;
    }

    card_body.append(card_title, card_text,card_date, card_btn);
    card.append(img_wrap, card_body);
    img_wrap.append(card_img);

    eventSection.append(card);
  });
}
