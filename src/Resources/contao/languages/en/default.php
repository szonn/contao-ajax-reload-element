<?php


use Szonn\ContaoAjaxReloadElementBundle\EventListener\AjaxReloadElementListener;


/**
 * Fields
 */
$GLOBALS['TL_LANG']['ERR']['ajaxReloadElement'][AjaxReloadElementListener::ERROR_ELEMENT_NOT_FOUND]        = 'Could not find element %s.';
$GLOBALS['TL_LANG']['ERR']['ajaxReloadElement'][AjaxReloadElementListener::ERROR_ELEMENT_AJAX_NOT_ALLOWED] = '%s ID %u is not allowed to fetch.';
$GLOBALS['TL_LANG']['ERR']['ajaxReloadElement'][AjaxReloadElementListener::ERROR_ELEMENT_TYPE_UNKNOWN]     = 'Could not determine whether the element is a module or content element';
