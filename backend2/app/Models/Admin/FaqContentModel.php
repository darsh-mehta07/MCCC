<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class FaqContentModel extends Model
{
    protected $table = 'faq_contents';
    protected $fillable = ['title', 'description', 'faq_category_id'];
}
