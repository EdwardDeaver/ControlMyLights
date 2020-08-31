var Queue = require('bull');

var videoQueue = new Queue('video transcoding', 'redis://127.0.0.1:6379');


var dataNum = 0;

videoQueue.add({data: "yolo"});
videoQueue.add({data: "yolo"});

videoQueue.add({data: "yolo"});
videoQueue.add({data: "yolo"});
videoQueue.add({data: "yolo"});
videoQueue.add({data: "yolo"});
videoQueue.add({data: "yolo"});
videoQueue.add({data: "yolo"});
videoQueue.add({data: "yolo"});
videoQueue.add({data: "yolo"});
videoQueue.add({data: "yolo"});
videoQueue.add({data: "yolo"});

videoQueue.process(async job => {
    demo(job.data);
    await sleep(2000);

  })

  async function demo(data) {
    console.log('Taking a break...'+dataNum);
    console.log(data);
    dataNum++;
  }


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }




  