<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class FaqCategoriesModel extends Model
{
    protected $table = 'faq_categories';
    protected $fillable = ['name'];
}
