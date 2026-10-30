<?php
/**
 * Envío del formulario de contacto por SMTP con PHPMailer 7.
 *
 * La configuración (servidor SMTP, usuario, contraseña y destinatarios) está en
 * config.php. La contraseña real se escribe solo en la copia del hosting.
 *
 * Respuestas que entiende js/script.js:
 *   MF000 enviado · MF001 sin destinatarios/config · MF003 email inválido
 *   MF004 sin tipo de formulario · MF254 error de PHPMailer · MF255 otro error
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailerException;

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

header('Content-Type: text/plain; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die('MF255');
}

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    die('MF001');
}
$config = require $configFile;

if (empty($config['recipients'])) {
    die('MF001');
}

// Antispam: campo oculto que solo rellenan los bots. Se responde "enviado"
// para que el bot no sepa que fue descartado.
if (!empty($_POST['website'])) {
    die('MF000');
}

if (!isset($_POST['form-type'])) {
    die('MF004');
}

// Lee un campo del formulario, sin espacios extremos y con un largo máximo
function campo($name, $max)
{
    $value = isset($_POST[$name]) ? trim((string) $_POST[$name]) : '';
    return function_exists('mb_substr') ? mb_substr($value, 0, $max, 'UTF-8') : substr($value, 0, $max);
}

function html($text)
{
    return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}

$email = campo('email', 254);
if (!PHPMailer::validateAddress($email)) {
    die('MF003');
}

// Campos que se incluyen en el correo, con su etiqueta
$campos = array(
    'nombre'   => array('Nombre:', campo('nombre', 100)),
    'telefono' => array('Teléfono:', campo('telefono', 30)),
);
$mensaje = campo('message', 5000);
$aceptaPrivacidad = campo('privacidad', 20) === 'acepto';

$subject = 'Nuevo mensaje desde el sitio web';
$siteName = isset($config['siteName']) ? $config['siteName'] : $_SERVER['SERVER_NAME'];

try {
    $template = file_get_contents(__DIR__ . '/rd-mailform.tpl');

    $template = str_replace(
        array('<!-- #{FromState} -->', '<!-- #{FromEmail} -->'),
        array('Email:', html($email)),
        $template
    );
    $template = str_replace(
        array('<!-- #{MessageState} -->', '<!-- #{MessageDescription} -->'),
        array('Mensaje:', nl2br(html($mensaje))),
        $template
    );

    // Repite la fila de ejemplo de la plantilla por cada campo con valor
    preg_match('/<!-- #\{BeginInfo\} -->(.*?)<!-- #\{EndInfo\} -->/s', $template, $fila);
    $filas = '';
    $campos['privacidad'] = array('Privacidad:', $aceptaPrivacidad ? 'Aceptó la política de privacidad' : 'No aceptó');
    foreach ($campos as $info) {
        if ($info[1] === '') {
            continue;
        }
        $filas .= str_replace(
            array('<!-- #{InfoState} -->', '<!-- #{InfoDescription} -->'),
            array(html($info[0]), html($info[1])),
            $fila[1]
        );
    }
    $template = str_replace($fila[0], $filas, $template);
    $template = str_replace(
        array('<!-- #{Subject} -->', '<!-- #{SiteName} -->'),
        array(html($subject), html($siteName)),
        $template
    );

    $mail = new PHPMailer(true);
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->isSMTP();
    $mail->Host = $config['smtpHost'];
    $mail->Port = (int) $config['smtpPort'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtpUser'];
    $mail->Password = $config['smtpPassword'];
    // 465 usa SSL directo; 587 usa STARTTLS
    $mail->SMTPSecure = $mail->Port === 465 ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;

    // El remitente es siempre la cuenta del dominio (evita que el correo caiga
    // en spam); al responder, la respuesta va al visitante.
    $mail->setFrom($config['smtpUser'], $siteName);
    $nombre = $campos['nombre'][1];
    $mail->addReplyTo($email, $nombre !== '' ? $nombre : $email);

    foreach ($config['recipients'] as $recipient) {
        $mail->addAddress($recipient);
    }

    $mail->Subject = $subject;
    $mail->msgHTML($template);
    $mail->send();

    die('MF000');
} catch (MailerException $e) {
    error_log('rd-mailform: ' . $e->getMessage());
    die('MF254');
} catch (\Exception $e) {
    error_log('rd-mailform: ' . $e->getMessage());
    die('MF255');
}
