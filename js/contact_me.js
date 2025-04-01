$(document).ready(function() {
  // Initialize EmailJS with your User ID
  emailjs.init("47Sfd5g4f9BnD8uls");

  $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // Error handling
    },
    submitSuccess: function($form, event) {
      event.preventDefault();

      // Get form values PROPERLY
      var formData = {
        from_name: $("input[name='name']").val().trim(),
        from_email: $("input[name='email']").val().trim(),
        phone_number: $("input[name='phone']").val().trim(),
        message: $("textarea[name='message']").val().trim()
      };

      var $submitBtn = $("#sendMessageButton");
      $submitBtn.prop("disabled", true).html('Sending...');

      emailjs.send("service_vygi4wf", "template_gmlhh5g", formData)
        .then(function() {
          $('#success').html(`
            <div class="alert alert-success">
              <button type="button" class="close" data-dismiss="alert">&times;</button>
              <strong>Message sent successfully!</strong>
            </div>
          `);
          $form.trigger("reset");
        }, function(error) {
          $('#success').html(`
            <div class="alert alert-danger">
              <button type="button" class="close" data-dismiss="alert">&times;</button>
              <strong>Error sending message. Please try again.</strong>
            </div>
          `);
        })
        .finally(function() {
          setTimeout(function() {
            $submitBtn.prop("disabled", false).html('Send Message');
          }, 1000);
        });
    }
  });
});