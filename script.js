function displayNotifications() {
    const notificationDiv = document.getElementById("notification");
    notificationDiv.innerHTML = '';
    
    db.collection("notifications")
      .where("email", "==", userEmail)
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const notification = doc.data();
          const content = `
            <div class="notification">
              <p>${notification.message}</p>
              <small>${notification.timestamp.toDate().toLocaleString()}</small>
            </div>
          `;
          notificationDiv.insertAdjacentHTML('beforeend', content);
        });
      })
      .catch((error) => {
        console.error("Error fetching notifications: ", error);
      });
}

function RemoveNotification() {
    const notificationDiv = document.getElementById("notification");
    notificationDiv.innerHTML = '';
    db.collection("notifications")
      .where("email", "==", userEmail)
      .get()
      .then((querySnapshot) => {
        const batch = db.batch();
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      })
      .then(() => {
        console.log("Notifications cleared from Firestore.");
      })
      .catch((error) => {
        console.error("Error clearing notifications from Firestore: ", error);
      });
}


let userEmail = "";
document.addEventListener("DOMContentLoaded", function () {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            userEmail = user.email; 
            var email = user.email;
            document.getElementById("Cust_Info").textContent = email;
            displayNotifications();
        } else {
            window.location.href = "login.html";
        }
    });
});

function data(){
    var area = document.getElementById("Area");
    if (area.value == "") {
        alert("Enter Area");
        console.error("Area is not Entered");
        return;
    } else {
        var checkboxes = document.getElementsByClassName("checkbox");
        var selectedVegetables = [];

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var vegetable = checkboxes[i].value;
                var quantityInput = checkboxes[i].nextElementSibling;
                var quantity = quantityInput.value;
                if (quantity !== "" && quantity > 0) {
                    selectedVegetables.push({
                        vegetable: vegetable,
                        quantity: quantity
                    });
                }
            }
        }

        firebase.firestore().collection("orders").add({
            email: userEmail,
            area: area.value,
            vegetables: selectedVegetables,
            status: "pending"
        }).then(() => {
            alert("Data has been saved.");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });

        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
            checkboxes[i].nextElementSibling.value = '';
        }
        area.value = '';
    }
}
