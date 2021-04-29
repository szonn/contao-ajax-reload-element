<?php

use Szonn\ContaoAjaxReloadElementBundle\EventListener\AjaxReloadElementListener;

$GLOBALS['TL_HOOKS']['parseTemplate'][] = [AjaxReloadElementListener::class, 'onParseTemplate'];
$GLOBALS['TL_HOOKS']['getPageLayout'][] = [AjaxReloadElementListener::class, 'onGetPageLayout'];
