(function() {
  var fileInput = document.getElementById('file-input');
  var submitButton = document.getElementById('submit-button');

  var handleFileInput = function(e) {
    // only doing one file at a time folks
    var file = e.target.files[0];
    if (!file.type.match('image.*')) return;
    var reader = new FileReader();
    reader.onload = (function(f) {
      return function(e) {
        $('.upload-preview').html(['<img src="', e.target.result, '" name="', escape(f.name), '">'].join(''));
        $('#submit-button').show();
      };
    })(file);
    reader.readAsDataURL(file);
  };

  var successfulUpload = function() {
    // it is here that some shit is done
    console.log('debug: success');
  };

  var notSuccessfulUpload = function() {
    // it is here that some shit is also done
    console.log('debug: failure');
  };

  var uploadFile = function(e) {
    var src = $('.upload-preview img').attr('src');
    var name = $('.upload-preview img').attr('name');
    if (!src || !name) return;
    $.ajax({
      type: 'POST',
      url: '/upload',
      data: {
        filename: name,
        data: src
      },
      success: successfulUpload,
      error: notSuccessfulUpload
    });
  };

  fileInput.addEventListener('change', handleFileInput, false);
  submitButton.addEventListener('mouseup', uploadFile, false);
})();
