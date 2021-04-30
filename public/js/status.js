$(document).ready(function () {
    //update cliclables
    $.get(`/check-status`, {}, function (result) {
        if (localStorage.getItem("STATUS") == "false") { //visitor
            //change functionality of upvote
            var upvote = document.getElementsByClassName("upvote");
            for (var i = 0; i < upvote.length; i++) {
                upvote[i].removeAttribute("onclick");
                upvote[i].setAttribute("data-toggle", "modal");
                upvote[i].setAttribute("data-target", "#visitorModal");
            }

            //change functionality of downvote
            var downvote = document.getElementsByClassName("downvote");
            for (var i = 0; i < downvote.length; i++) {
                downvote[i].removeAttribute("onclick");
                downvote[i].setAttribute("data-toggle", "modal");
                downvote[i].setAttribute("data-target", "#visitorModal");
            }

            //change functionality of create buttons
            var create = document.getElementsByClassName("create");
            for (var i = 0; i < create.length; i++) {
                create[i].removeAttribute("onclick");
                create[i].setAttribute("data-toggle", "modal");
                create[i].setAttribute("data-target", "#visitorModal");
            }

            var follow = document.getElementsByClassName("follow");
            for (var i = 0; i < follow.length; i++) {
                follow[i].removeAttribute("onclick");
                follow[i].setAttribute("data-toggle", "modal");
                follow[i].setAttribute("data-target", "#visitorModal");

                follow[i].classList.remove("btn-warning");
                follow[i].classList.add("btn-outline-warning");
                follow[i].innerHTML = "<strong>Follow</strong>";
            }


            //modal
            var div = document.createElement("div");
            div.classList.add("modal", "fade");
            div.setAttribute("id", "visitorModal");
            div.innerHTML =
            `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Notice</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        You must sign in first before performing this operation.
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
            `;

            document.getElementsByTagName("body")[0].appendChild(div);

            var modify = document.getElementsByClassName("modify");

            while (modify.length > 0) {
                modify[0].remove();
            }
        }
    });
});

function removeFollowSelf () {

    if (localStorage.getItem("STATUS") == "true") {
        var self = document.getElementsByClassName("follow-self");
        for (var i = 0; i < self.length; i++) {
            self[i].remove();
        }
    }
}
