<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class ContactEnquiryModel extends Model
{
    protected $table = 'contact_enquiry';
    protected $fillable = ['name', 'email', 'phone', 'subject', 'message'];
}
