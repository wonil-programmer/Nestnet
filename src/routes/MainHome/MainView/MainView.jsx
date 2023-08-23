import mVImg from "../../../assets/images/a2.jpg";

export default function MainView() {
  return (
    <div class="mvArea relative w-full h-screen">
      <div class="mvImg absolute top-0 left-0 w-full h-full">
        <div class="image-wrapper w-full h-full">
          <img class="w-full h-full" src={mVImg} alt="메인이미지" />
        </div>
      </div>
      <div class="mvTitle absolute top-80 left-36">
        <div class="text-home-maintitle text-white font-semibold">Nestnet</div>
        <div class="text-home-subtitle text-white font-medium">
          소프트웨어학부 1등 학술동아리
        </div>
      </div>
    </div>
  );
}
