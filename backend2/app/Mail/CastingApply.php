<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CastingApply extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $application_id;
    public $user;
    public $profile;
    public $dt;
    public function __construct($user,$applicationID,$profile,$dt)
    {
        $this->user = $user;
        $this->application_id = $applicationID;
        $this->profile = $profile;
        $this->dt = $dt;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject = 'Casting Call application.';
        $address = 'bablu.wdipl@gmail.com';
        $name    =     'MCCC';
        return $this->view('email.casting-apply')
                    ->from($address, $name)
                    ->subject($subject);
    }
}
