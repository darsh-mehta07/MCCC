<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EventRegistrationAdmin extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $user;
    public $profile;
    public $event;
    public $eventdata;
    public $aadharImage;
    public $pancardImage;
    public $subjectForAdmin;
    public function __construct($user,$profile,$event,$eventdata,$aadharImage,$pancardImage,$subjectForAdmin)
    {
        $this->user             = $user;
        $this->profile          = $profile;
        $this->event            = $event;
        $this->eventdata        = $eventdata;
        $this->aadharImage      = $aadharImage;
        $this->pancardImage     = $pancardImage;
        $this->subjectForAdmin  = $subjectForAdmin;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject = $this->subjectForAdmin;
        $address = 'bablu.wdipl@gmail.com';
        $name    =     'MCCC';
        $url = 'https://mccc.wdipl.com/backend2/public/uploads';
        
        return $this->view('email.event-training-admin')->from($address, $name)->subject($subject)
        ->attach(('https://mccc.wdipl.com/backend2/public/uploads/Users/AadharcardImages/'.$this->aadharImage), [
                         'as' => 'aadhar.png',
                         'mime' => 'application/image',
                    ])
        ->attach(('https://mccc.wdipl.com/backend2/public/uploads/Users/PancardImages/'.$this->pancardImage), [
                         'as' => 'pancard.png',
                         'mime' => 'application/image',
                    ]);   
    }
}
