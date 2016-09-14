import React from 'react';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.openExternalLink = this.openExternalLink.bind(this);
  }

  render() {
    return (
      <footer>
        <div className="left-side">
          <p><a className="nav__trending" onClick={this.handleClick}>#trending</a></p>
        </div>
        <div className="right-side">
          <p>Built by <a onClick={this.openExternalLink} className="nav__pete" href="http://peteroo.me">
            <svg
              width="90px"
              height="48px"
              viewBox="0 0 90 48"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <path
                fill="#ffffff"
                stroke="none"
                d="M82.6951532,30.2185366 C82.6281552,36.671993 82.558065,43.3460275 66.9444317,43.3460275 C63.6883275,43.3460275 59.8230565,43.1728634 57.0720143,41.188691 C55.4331394,40.0074641 54.6250401,38.1181197 54.1838838,36.206099 C53.6942828,34.085869 53.2995098,31.8337045 53.1789134,29.6609068 C53.0985157,28.2323027 53.1964359,26.7294853 53.8787851,25.4420924 C55.7454533,21.9190267 61.7258005,20.4162094 71.4580375,20.4162094 C72.8515965,20.4162094 74.2142334,20.4409471 75.5088414,20.4646541 C75.5377021,20.4646541 75.5655321,20.4656849 75.5943928,20.4656849 C79.51017,20.5388673 82.7137065,23.3723686 82.7137065,26.7686534 C82.7137065,26.7686534 82.7003069,29.7815033 82.6951532,30.2185366 M36.2902561,34.9908578 C36.0799853,36.0710722 35.8058088,37.1347948 35.4172202,38.1387345 C35.0791378,39.0107396 34.596752,39.8178082 33.9350176,40.4836655 C31.8436484,42.5925574 28.5421916,43.0831891 25.7189977,43.2697528 C24.892345,43.3233513 24.0636309,43.3460275 23.2349169,43.3460275 C7.6212836,43.3460275 7.5511934,36.671993 7.4841953,30.2185366 C7.4790416,29.7815033 7.465642,26.7686534 7.465642,26.7686534 C7.465642,23.3723686 10.6691786,20.5388673 14.5849558,20.4656849 C14.6138165,20.4656849 14.6416464,20.4646541 14.6705071,20.4646541 C15.9640845,20.4409471 17.3277521,20.4162094 18.7213111,20.4162094 C28.453548,20.4162094 34.4328645,21.9190267 36.3005635,25.4420924 C37.2117367,27.1613649 37.1004169,29.2341809 36.8654084,31.1029106 C36.7056439,32.3748424 36.5427871,33.695219 36.2902561,34.9908578 M57.2183792,3.141025 L54.2673737,7.9226229 C53.772619,8.7245378 53.9983508,9.7058012 54.8136653,10.2964146 C55.9629392,11.1302824 57.7450868,10.8385833 58.4325897,9.7037397 L61.1052957,5.2963001 C62.036053,3.7625606 64.4582894,3.3925253 65.9786293,4.5510759 L80.7089193,16.8508834 C72.5227908,16.6375205 61.2702139,17.1023837 52.8707224,20.3852872 C46.1740116,23.0023334 43.7290989,23.1054072 37.0870173,20.3852872 C28.7215402,16.959111 17.5751294,16.49734 9.4137386,16.7488403 L24.0224014,4.5510759 C25.5417106,3.3925253 27.9649778,3.7625606 28.8947043,5.2963001 L31.5674103,9.7037397 C32.2559439,10.8385833 34.0370608,11.1302824 35.1873654,10.2964146 C36.0026799,9.7058012 36.2284117,8.7245378 35.7336571,7.9226229 L32.7816208,3.141025 C30.7912639,-0.0841571 25.7839342,-1.0056377 22.3567273,1.2228199 L0,16.6024754 L0,21.7623544 C1.06681479,22.5075787 2.42635943,23.9743202 3.11180082,26.8036985 C4.3373494,31.8687496 -0.81634523,47.0700873 23.2349169,47.0700873 C26.5301892,47.0700873 29.9594576,46.7938492 33.0496129,45.5641777 C35.0080169,44.7849391 36.7808878,43.5676364 38.0126208,41.8380565 C39.0114068,40.4331593 39.5948051,38.7963459 39.9875166,37.1306718 C40.3338449,35.6567151 40.5162857,34.1456519 40.9048742,32.6809719 C41.2017271,31.5595279 41.6645288,30.3731474 42.694237,29.7309971 C43.8280498,29.0228794 45.6699803,28.9806191 46.8986211,29.5361874 C47.420175,29.7722266 47.8530853,30.1484463 48.1818911,30.6143403 C48.9384534,31.6904318 49.1755234,33.08296 49.4156856,34.3476767 C49.721815,35.9515065 49.9908379,37.5687358 50.5464062,39.1096905 C51.1710339,40.8433934 52.165697,42.4152703 53.5778093,43.6129889 C55.5279674,45.2683556 58.0336937,46.1145923 60.515713,46.5701789 C62.5596683,46.9453679 64.6469147,47.0700873 66.7228229,47.0700873 C90.7730542,47.0700873 85.6193596,31.8687496 86.8459389,26.8036985 C87.5406569,23.9361828 88.9270008,22.4684106 90,21.732463 L90,16.6024754 L67.6443034,1.2228199 C64.2160658,-1.0056377 59.2097668,-0.0841571 57.2183792,3.141025" id="Shape"></path>
            </svg>
          </a></p>
        </div>
      </footer>
    );
  }

  handleClick(event) {
    event.preventDefault();
    this.props.fetchGifs();
    this.props.clearSearch();
    window.scrollTo(0, 0);
  }

  openExternalLink(event) {
    event.preventDefault();
    var href = event.currentTarget.href;
    shell.openExternal(href);
  }
}
