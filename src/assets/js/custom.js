$(document).ready(function() {
    $('.btn').click(function() {
        $('.wrapFunction').wrapAll('<div class="row"></div>');
    });    
    // work_experinces
    $('#WEplus').click(function() {
        $('#add_work_wxperince').append(` <div class="input input_minus">
        <input type="text" formControlName="work_expe[]" maxlength="200" placeholder="Lead Role In Vastav">
        <span id='WEminus' class='WEminus'><img src="https://img.icons8.com/material-rounded/12/000000/minus.png"/></span>
    </div>`);
        $('.WEminus').click(function() {
            $(this).parent().remove();
        });
    });
    // add_qualification
    $('#Qplus').click(function() {
        $('#add_qualification').append(` <div class="input input_minus">
        <input type="text" formControlName="qualification[]" maxlength="200" placeholder="Type Here.........">
        <span id='Qminus' class='Qminus'><img src="https://img.icons8.com/material-rounded/12/000000/minus.png"/></span>
    </div>`);
        $('.Qminus').click(function() {
            $(this).parent().remove();
        });
    });
    // add_soacilaLinks
    $('#SLplus').click(function() {
        $('#add_social_links').append(` <div class="input input_minus">
        <input type="text" formControlName="social_link[]" maxlength="200" placeholder="https://youtu.be/0LhBvp8qpro">
        <span id='Qminus' class='SLminus'><img src="https://img.icons8.com/material-rounded/12/000000/minus.png"/></span>
    </div>`);
        $('.SLminus').click(function() {
            $(this).parent().remove();
        });
    });
    
    function openNav() {
        document.getElementById("mySidenav").style.width = "300px";
    }
    
    /* Set the width of the side navigation to 0 */
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
});



 
