@include('Admin.layouts.header') 

<form action = "/add_bts_videos" method = "post" name="addBtsVideos" id="addBtsVideos" enctype="multipart/form-data">
    {{ csrf_field() }}
    <div class="container">
        <h3>Add BTS Videos</h3>
    <div class="form-group">
      <label>Select Category</label>
      <select type="text" class="form-control" id="category_id" name="category_id" >
          <option value="" disabled >select Category</option>
            @foreach ($data as $dat)
            <option value="{{ $dat->id }}">{{ $dat->category }}</option>
            @endforeach
      </select>
    </div>
    <div class="form-group">
      <label >Video URL</label>
      <input type="text" class="form-control" id="video_url" name="video_url" />
    </div>
    <div class="form-group">
      <label >Title</label>
      <input type="text" class="form-control" id="title" name="title" />
    </div>
    <div class="form-group">
      <label >Description</label>
      <textarea type="text" class="form-control" id="description" name="description" ></textarea>
    </div>
    <div class="form-group">
      <label >Thumbnail Image</label>
      <input class="form-control btsfileSource" type="file" id="fileSource" name="fileSource" >
       <input type="hidden" name="cropedBtsImage" id="cropedBtsImage" value="" />
       <input type="hidden" name="youtubeThumbnail" id="youtubeThumbnail" value="" />
      <span id="btsimgerrormsg"></span>
    </div>
           
    <button type="submit" class="btn btn-primary" id="btsSubmit">Submit</button>
    </div>
</form>

@include('Admin.layouts.footer')

