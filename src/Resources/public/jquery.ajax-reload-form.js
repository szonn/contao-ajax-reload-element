
(function ($) {
    $.fn.ajaxReloadForm = function (options) {
        options = $.extend({
            selector: '*[data-ajax-reload-form-submit] form',
            reloadCssClass: 'ajax-reload-element-overlay'
        }, options);

        $(document).on('submit', options.selector, function (event) {
            var buildUrl, $element, $form, formAction;
            event.preventDefault();

            $form = $(this);
            $element = $(this).closest('*[class^="ce_"][data-ajax-reload-element],*[class^="mod_"][data-ajax-reload-element]');
            $element.addClass(options.reloadCssClass);
            $element.trigger('ajax-reload:submitted');

            formAction = $form.attr('action') ? $form.attr('action') : location.href;
            buildUrl = function (base, params) {
                var sep = (base.indexOf('?') > -1) ? '&' : '?';
                return base + sep + params;
            };

            $.ajax({
                method: $form.attr('method'),
                url: buildUrl(formAction, jQuery.param({
                    ajax_reload_element: $element.attr('data-ajax-reload-element')
                })),
                data: $form.serialize()
            })
                .done(function (response, status) {
                    if ('nocontent' !== status) {
                        if ('ok' === response.status) {
                            // Use replaceAll instead of replaceWith, so we can fetch the updated action attribute below
                            $element = $(response.html).replaceAll($element);

                            if ('get' === $form.attr('method').toLowerCase()) {
                                // Update the current url
                                window.history.pushState({}, '', window.location.protocol + '//' + window.location.host + '/' + $element.find('form:first').attr('action'));
                            }

                            $element.trigger('ajax-reload:completed');
                        }
                        else {
                            location.reload();
                        }
                    }
                })
                .fail(function (xhr) {
                    if (302 === xhr.status) {
                        if (xhr.getResponseHeader('X-Ajax-Location').indexOf(this.url) >= 0) {
                            // The element processes a reload
                            // Trigger new ajax request
                            $form.find('[name=FORM_SUBMIT]').val('');
                            $form.submit();
                        }
                        else {
                            // The element processes a redirect
                            window.location.replace(xhr.getResponseHeader('X-Ajax-Location'));
                        }
                    }
                    else {
                        location.reload();
                    }
                });
        });
    };
}(jQuery));
