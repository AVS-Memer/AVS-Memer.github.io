let cards = [];
      let dice = 10;
      fetch("/Data/JSON/NumberBettingCalculator/cards.json")
        .then(res => {return res.json()})
        .then(data => data.forEach(card => cards.push(card)))
        .catch(err => console.log(err));
      const cardsUsed = [document.getElementById("p1-card-1"), document.getElementById("p1-card-2"), document.getElementById("p2-card-1"), document.getElementById("p2-card-2")];

      const switchDice = () => {
        document.querySelector("#dice button").innerText = `Change to ${dice} Sided Dice`;
        dice = (dice === 10) ? 6 : 10;
        document.querySelector("#dice p").innerText = `${dice} Sided Dice`;
      }

      const findThreshold = () => {
        if (cards == []) {
          return;
        }
        let cardInputs = [];
        let threshold = Math.pow(dice,4)/2;
        let error;
        document.getElementById("t-box-inner").innerHTML = "";
        cardsUsed.forEach((box, index) => {
          if (error) {
            return;
          }
          // finding an opposing box and canceling it out
          let opBox = cardsUsed.slice(2).find(card => card.querySelector("input").value.toLowerCase() === box.querySelector("input").value.toLowerCase());
          if (index < 2 && opBox) {
            box.querySelector("p").innerText = "Card " + (index%2+1) + ":";
            box.getElementsByTagName("p")[1].innerText = "";
            box.querySelector("input").value = "";
            box.style.backgroundColor = "black";
            opBox.querySelector("p").innerText = "Card " + (cardsUsed.slice(2).findIndex(card => card.querySelector("input").value.toLowerCase() === box.querySelector("input").value.toLowerCase()) %2+1) + ":";
            opBox.getElementsByTagName("p")[1].innerText = "";
            opBox.querySelector("input").value = "";
            opBox.style.backgroundColor = "black";
            return;
          }
          const card = cards.find(card => card.name.toLowerCase() === box.querySelector("input").value.toLowerCase());
          if (card) {
            // checking for duplicate number cards
            if (card.type === "Number" && index%2 === 1 && box.querySelector("input").value.toLowerCase() === cardsUsed[index-1].querySelector("input").value.toLowerCase()) {
              box.querySelector("p").innerText = "Card " + (index%2+1) + ":";
              box.getElementsByTagName("p")[1].innerText = "";
              box.querySelector("input").value = "";
              box.style.backgroundColor = "black";
              return;
            }
            cardInputs.push(card);
            box.querySelector("p").innerText = card.name;
            box.getElementsByTagName("p")[1].innerText = card.rarity;
            switch (card.rarity) {
              case "Common":
              case "Common+":
                box.style.backgroundColor = "gray";
                break;
              case "Uncommon":
              case "Uncommon+":
                box.style.backgroundColor = "green";
                break;
              case "Rare":
              case "Rare+":
                box.style.backgroundColor = "blue";
                break;
              case "Epic-":
              case "Epic":
              case "Epic+":
                box.style.backgroundColor = "purple";
                break;
              case "Legendary-":
              case "Legendary":
              case "Legendary+":
                box.style.backgroundColor = "orange";
                break;
              case "Mythic":
              case "Mythic+":
                box.style.backgroundColor = "pink";
                break;
              case "Special":
                box.style.backgroundColor = "red";
                break;
              default:
                box.style.backgroundColor = "black";
            }
            switch (card.type) {
              case "Threshold":
                threshold += card.value * (1-Math.floor(index/2)*2);
                break;
              case "Percentage":
                threshold += card.value * Math.pow(dice,4) * (1-Math.floor(index/2)*2);
                break;
              case "Number":
                // checking for repeat number cards
                let favor = document.createElement("p");
                favor.innerText = `${(index<2) ? 'Top' : 'Bottom'} Player has ${card.value} in their favor`;
                document.getElementById("t-box-inner").appendChild(favor);
                break;
            }
          } else if (box.querySelector("input").value.trim() === "") {
            box.querySelector("p").innerText = "Card " + (index%2+1) + ":";
            box.getElementsByTagName("p")[1].innerText = "";
            box.style.backgroundColor = "black";
          } else {
            box.style.backgroundColor = "red";
            document.querySelector("#t-box p").innerText = "Threshold: ";
            document.querySelector("#error p").innerText = `Invalid Input\n${(index<2)?"Top":"Bottom"} Player\nCard ${(index%2+1)}`;
            document.getElementById("error").style.backgroundColor = "red";
            error = true;
            return;
          }
        });
        if (error) {
          return;
        }
        if (threshold <= 0 || threshold >= Math.pow(dice,4)) {
          document.querySelector("#t-box p").innerText = "Threshold: ";
          document.querySelector("#error p").innerText = "Threshold is not allowed to be out of range";
          document.getElementById("error").style.backgroundColor = "red";
          return;
        }
        if (dice === 6) {
          threshold = Math.round(threshold).toString(6);
        }
        document.querySelector("#error p").innerText = "";
        document.getElementById("error").style.backgroundColor = "black";
        document.querySelector("#t-box p").innerText = "Threshold: " + threshold;
      }
