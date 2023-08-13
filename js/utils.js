class DateUtils {
    static leftPad(value) {
        if (value >= 10) {
            return value;
        }
        return `0${value}`; //날짜가 10보다 작으면 01, 02, ..처럼 표기
    }


    /*
    0. 일단 new Date()-> 월 일 getter 함수 불러오기
    1. updateTodoList()에서 createDate()가 오늘인지 체크해서 True면 'Today'로 
    2. Today, Yesterday, Tomorrow가 아니면??
      -> 그때 month를 영어로
    */

/*   //메소드 종류
    1. 날짜가 어제 오늘 내일이면 'Today', ... 로 표현해주는 함수
    2. 
    
*/
    //날짜가 어제 오늘 내일이면 'Yesterday', ...로 변환
    static transSpecificDate(createDateObj) {
        const btMs = createDateObj.getTime() - new Date().getTime();
        const btDay =  Math.abs(btMs / (1000 * 60 * 60 * 24));
        switch (btDay){
            //어제
            case -1:
                return 'Yesterday';
            case 0:
                return 'Today';
            case 1:
                return 'Tomorrow';
        }
        
        return this.toStringByFormatting(createDateObj);
    }
    //new Date() 한 결과를 '8-23'으로
    static toStringByFormatting(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; //1월을 0으로 반환
        const day = date.getDate();
        
        return [year, month, day].join("-");
        //리스트의 요소를 문자열로 합쳐줄때 ','을 '-'로 바꿔서 반환
    }
    static testToStringbyFormatting(date){
        const year = date.getFullYear();
        const month = date.getMonth() + 1; //1월을 0으로 반환
        const day = date.getDate();
        
        month = this.monthToString(month);
        
        return [month, day].join(" ");
    }

    static monthToString(month) {
        switch (month) {
            case 1:
                month = 'January';
                break;
            case 2:
                month = 'February';
                break;
            case 3:
                month = 'March';
                break;
            case 4:
                month = 'April';
                break;
            case 5:
                month = 'May';
                break;
            case 6:
                month = 'June';
                break;
            case 7:
                month = 'July';
                break;
            case 8:
                month = 'August';
                break;
            case 9:
                month = 'September';
                break;
            case 10:
                month = 'October';
                break;
            case 11:
                month = 'November';
                break;
            case 12:
                month = 'December';
        }
    }
}