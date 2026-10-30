<?php
/**
 * Configuración del formulario de contacto.
 *
 * IMPORTANTE: este archivo está en GitHub, que es público. Escribe la
 * contraseña real SOLO en la copia que está en el hosting (por FTP o el
 * administrador de archivos), nunca aquí. En el servidor, .htaccess bloquea
 * que este archivo se pueda descargar desde el navegador.
 */
return array(
    // Nombre que aparece como remitente y en el cuerpo del correo
    'siteName'     => 'EG Impresiones 3D',

    // Datos SMTP de la cuenta de correo del dominio (los da el hosting)
    'smtpHost'     => 'mail.tudominio.com',
    'smtpPort'     => 465,              // 465 (SSL) o 587 (STARTTLS)
    'smtpUser'     => 'info@tudominio.com',
    'smtpPassword' => '',               // Completar solo en el hosting

    // Correos que reciben los mensajes del formulario
    'recipients'   => array('alexfarinangog@gmail.com'),
);
