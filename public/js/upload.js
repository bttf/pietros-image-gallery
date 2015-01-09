(function() {
  function setButtonStatus(status) {
    switch (status) {
      case 'success':
        $('#submit-button').attr('class', 'btn btn-success');
        $('.failure-facade').hide();
        $('.loading-spokes').hide();
        $('.upload-facade').hide();
        $('.success-facade').show();
        break;
      case 'failure':
        $('#submit-button').attr('class', 'btn btn-danger');
        $('.upload-facade').hide();
        $('.success-facade').hide();
        $('.loading-spokes').hide();
        $('.failure-facade').show();
        break;
      case 'loading':
        $('#submit-button').attr('class', 'btn btn-primary');
        $('.success-facade').hide();
        $('.failure-facade').hide();
        $('.upload-facade').hide();
        $('.loading-spokes').show();
        break;
      case 'ready':
        $('#submit-button').attr('class', 'btn btn-primary');
        $('.success-facade').hide();
        $('.failure-facade').hide();
        $('.loading-spokes').hide();
        $('.upload-facade').show();
        break;
    }
  }

  var handleFileInput = function(e) {
    $('#file-url').hide();
    setButtonStatus('ready');
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

  var successfulUpload = function(response) {
    setButtonStatus('success');
    $('#file-url').show();
    $('#file-url').val([window.location.href, 'uploads/', response].join(''));
  };

  var notSuccessfulUpload = function(xhr, status, err) {
    console.log('debug: failure', err);
    setButtonStatus('failure');
  };

  var uploadFile = function(e) {
    var src = $('.upload-preview img').attr('src');
    var name = $('.upload-preview img').attr('name');
    var submitted = $('#submit-button').attr('class').indexOf('success') != -1;
    if (!src || !name || submitted) return;
    setButtonStatus('loading');
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

  $('#file-url').focus(function() { $(this).select() });
  $('#submit-button').click(uploadFile);
  $('#file-input').change(handleFileInput);
})();
