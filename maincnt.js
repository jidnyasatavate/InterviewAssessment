var intApp = angular.module("app",[]);
    var MainController = function($scope,$filter){

        // For add/remove rows
        $scope.technicals = []
        $scope.addSkill = function() {
            $scope.technicals.push({name:'', rating:''})
        }
    
        $scope.removeRow = function(technical){
            var ind = $scope.technicals.indexOf(technical);
            $scope.technicals.splice(ind,1);
        };

        //To show only date in pdf
        $scope.convertDate = function(doi){
            $scope.dateresult = $filter('date')(doi, 'dd/MM/yyyy');
        }
        
        // To show only time in pdf
        $scope.convertFromTime = function(fromTime){
            $scope.from = fromTime.toLocaleTimeString();
        }

        $scope.convertToTime = function(toTime){
            $scope.to = toTime.toLocaleTimeString();
        }
        

        // Lookup values for dropdown
        $scope.behavior = ['Confident','Satisfactory','Poor'];

        // Show/Hide based on Skill selected
        $scope.check = function (skillset) {
            $scope.skillconditn = skillset === "Guidewire" ? true:false;
        };
        
        $scope.tech = ['Expert','Confident','Trained','Satisfactory','Poor'];

                   

        //  For exporting to PDF
        $scope.export = function () {
             if ($scope.isPdf == true){
                // var body = [];
                var body = [
                    [
                        {text: 'Technical Competencies:', style: 'subheader', colSpan: 6}, {}, {},{},{},{}
                    ],
                    [
                        {text: 'Technical Competencies:', style: 'subtitle'},{text: 'Expert',style: 'subtitle'},
                        {text: 'Confident',style: 'subtitle'},{text: 'Trained',style: 'subtitle'},
                        {text: 'Satisfactory',style: 'subtitle'},{text: 'Poor',style: 'subtitle'}
                    ],
                    [
                        {text: 'Technology Proficiency:', style: 'subtitle'},
                        {text: $scope.techprof =='Expert' ? '√' : ''},
                        {text: $scope.techprof == 'Confident' ? '√' : ''},
                        {text: $scope.techprof == 'Trained' ? '√' : ''},
                        {text: $scope.techprof == 'Satisfactory' ? '√' : ''},
                        {text: $scope.techprof == 'Poor' ? '√' : ''}
                    ],
                    [
                        {text: 'Domain Expertise:', style: 'subtitle'},
                        {text: $scope.domainExp =='Expert' ? '√' : ''},
                        {text: $scope.domainExp == 'Confident' ? '√' : ''},
                        {text: $scope.domainExp == 'Trained' ? '√' : ''},
                        {text: $scope.domainExp == 'Satisfactory' ? '√' : ''},
                        {text: $scope.domainExp == 'Poor' ? '√' : ''}
                    ],
                    [
                        {text: 'Design Skill:', style: 'subtitle'},
                        {text: $scope.designSkill =='Expert' ? '√' : ''},
                        {text: $scope.designSkill == 'Confident' ? '√' : ''},
                        {text: $scope.designSkill == 'Trained' ? '√' : ''},
                        {text: $scope.designSkill == 'Satisfactory' ? '√' : ''},
                        {text: $scope.designSkill == 'Poor' ? '√' : ''}
                    ],
                    [
                        {text: 'Estimation Skill:', style: 'subtitle'},
                        {text: $scope.estimationSkill =='Expert' ? '√' : ''},
                        {text: $scope.estimationSkill == 'Confident' ? '√' : ''},
                        {text: $scope.estimationSkill == 'Trained' ? '√' : ''},
                        {text: $scope.estimationSkill == 'Satisfactory' ? '√' : ''},
                        {text: $scope.estimationSkill == 'Poor' ? '√' : ''}
                    ],
                    [
                        {text: 'Testing Skill:', style: 'subtitle'},
                        {text: $scope.testingSkill =='Expert' ? '√' : ''},
                        {text: $scope.testingSkill == 'Confident' ? '√' : ''},
                        {text: $scope.testingSkill == 'Trained' ? '√' : ''},
                        {text: $scope.testingSkill == 'Satisfactory' ? '√' : ''},
                        {text: $scope.testingSkill == 'Poor' ? '√' : ''}
                    ],
                    [
                        {text: 'Knowledge of quality processes:', style: 'subtitle'},
                        {text: $scope.qualityProcess =='Expert' ? '√' : ''},
                        {text: $scope.qualityProcess == 'Confident' ? '√' : ''},
                        {text: $scope.qualityProcess == 'Trained' ? '√' : ''},
                        {text: $scope.qualityProcess == 'Satisfactory' ? '√' : ''},
                        {text: $scope.qualityProcess == 'Poor' ? '√' : ''}
                    ]
                ]
                // For the dynamic fields added under technical competencies, stored in technicals array
                for (i=0;i<$scope.technicals.length;i++){
                    var techcomp = $scope.technicals[i].rating;
                    // var techcomp = 'Expert'
                    console.log("rating is:", techcomp);
                    switch(techcomp){
                        case 'Expert': var row = [
                            {text: $scope.technicals[i].name , style: 'subtitle'},
                            {text: '√'},{},{},{},{}
                        ];
                        break;
                        case 'Confident': var row = [
                            {text: $scope.technicals[i].name , style: 'subtitle'},
                            {},{text: '√'},{},{},{}
                        ];
                        break;
                        case 'Trained': var row = [
                            {text: $scope.technicals[i].name , style: 'subtitle'},
                            {},{},{text: '√'},{},{}
                        ];
                        break;
                        case 'Satisfactory': var row = [
                            {text: $scope.technicals[i].name , style: 'subtitle'},
                            {},{},{},{text: '√'},{}
                        ];
                        break;
                        case 'Poor': var row = [
                            {text: $scope.technicals[i].name , style: 'subtitle'},
                            {},{},{},{},{text: '√'}
                        ];
                        break;
                    }
                    body.push(row);
                }
                // body.push(row);

                //doc definition for pdf
                var docDefinition = {
                    content:[
                        {text: 'Interview Assessment Form - A Level',style:'header'},
                        {   
                            style: 'topTable',
                            table: {
                                widths: ['*','*','*','*'],
                                heights: [18],
                                headerRows: 0,
                                body: [
                                    [
                                        {text: 'Name:', style: 'tableLabel1'}, {text: $scope.candidateName},
                                        {text: 'Date:', style: 'tableLabel1'}, {text: $scope.dateresult}
                                    ],
                                    [
                                        {text: 'Time:', style: 'tableLabel1', colSpan: 4}, {}, {},{}
                                    ],
                                    [
                                        {text: 'From:', style: 'tableLabel'}, {text: $scope.from},
                                        {text: 'To:', style: 'tableLabel'}, {text: $scope.to}
                                    ],
                                    [
                                        {text: 'Mode of Interview:', style: 'tableLabel1'}, {text: $scope.modeOfInt},
                                        {text: 'Skill:', style: 'tableLabel1'}, {text: $scope.skillset}
                                    ],
                                    [
                                        {text: 'Primary Skill:', style: 'tableLabel'}, {text: $scope.primSkill},
                                        {text: 'Secondary Skill:', style: 'tableLabel'}, {text: $scope.secSkill}
                                    ]
                                ]
                            },
                            
                            
                        },

                        {
                            style: 'topTable',
                            table:{
                                widths: ['auto','*','*','*','*','*'],
                                heights: [18],
                                headerRows: 0,
                                body: body
                            },
                        },
                        {
                            style: 'topTable',
                            table:{
                                widths: ['auto','*','*','*'],
                                heights: [18],
                                headerRows: 0,
                                body:[
                                    [
                                        {text: 'Behavioral Competencies:', style: 'subheader', colSpan: 4}, {}, {},{}
                                    ],
                                    [
                                        {text: 'Behavioral Competencies:', style: 'subtitle'},{text: 'Confident',style: 'subtitle'},
                                        {text: 'Satisfactory',style: 'subtitle'},{text: 'Poor',style: 'subtitle'}
                                    ],
                                    [
                                        {text: 'Personal Effectiveness:', style: 'subtitle'},
                                        {text: $scope.personalEffectiveness =='Confident' ? '√' : ''},
                                        {text: $scope.personalEffectiveness == 'Satisfactory' ? '√' : ''},
                                        {text: $scope.personalEffectiveness == 'Poor' ? '√' : ''}
                                    ],
                                    [
                                        {text: 'Communication Skills:', style: 'subtitle'},
                                        {text: $scope.communicationSkills =='Confident' ? '√' : ''},
                                        {text: $scope.communicationSkills == 'Satisfactory' ? '√' : ''},
                                        {text: $scope.communicationSkills == 'Poor' ? '√' : ''}
                                    ],
                                    [
                                        {text: 'Ability to work with others:', style: 'subtitle'},
                                        {text: $scope.workWithOthers =='Confident' ? '√' : ''},
                                        {text: $scope.workWithOthers == 'Satisfactory' ? '√' : ''},
                                        {text: $scope.workWithOthers == 'Poor' ? '√' : ''}
                                    ],
                                    [
                                        {text: 'Ability to deal with ambiguity:', style: 'subtitle'},
                                        {text: $scope.dealAmbiguity =='Confident' ? '√' : ''},
                                        {text: $scope.dealAmbiguity == 'Satisfactory' ? '√' : ''},
                                        {text: $scope.dealAmbiguity == 'Poor' ? '√' : ''}
                                    ],
                                    [
                                        {text: 'Creativity:', style: 'subtitle'},
                                        {text: $scope.creativity =='Confident' ? '√' : ''},
                                        {text: $scope.creativity== 'Satisfactory' ? '√' : ''},
                                        {text: $scope.creativity == 'Poor' ? '√' : ''}
                                    ],
                                    [
                                        {text: 'Initiative:', style: 'subtitle'},
                                        {text: $scope.initiativeSkill =='Confident' ? '√' : ''},
                                        {text: $scope.initiativeSkill == 'Satisfactory' ? '√' : ''},
                                        {text: $scope.initiativeSkill == 'Poor' ? '√' : ''}
                                    ],
                                    [
                                        {text: 'Analytical thinking:', style: 'subtitle'},
                                        {text: $scope.analyticalThinking =='Confident' ? '√' : ''},
                                        {text: $scope.analyticalThinking == 'Satisfactory' ? '√' : ''},
                                        {text: $scope.analyticalThinking == 'Poor' ? '√' : ''}
                                    ]  
                                ]
                            },
                        },
                        {
                            style: 'topTable',
                            table:{
                                widths: ['*','*'],
                                heights: [18],
                                headerRows: 0,
                                body:[
                                    [
                                        {text: 'Final Review:', style: 'subheader', colSpan: 2}, {}
                                    ],
                                    [
                                        {text: 'Behavioral Competencies:', style: 'subtitle'},{text: $scope.overallRating}
                                    ],
                                    [
                                        {text: 'Interview Feedback:', style: 'subtitle'},{text: $scope.intFeedback}
                                    ],
                                    [
                                        {text: 'Suggested Role:', style: 'subtitle'},{text: $scope.suggRole}
                                    ],
                                    [
                                        {text: 'Additional Comments:', style: 'subtitle'},{text: $scope.addComments}
                                    ],
                                    [
                                        {text: 'Interview conducted by:', style: 'subtitle'},{text: $scope.intConductedby}
                                    ]
                                    
                                ]
                            },
                        }

                    ],
                    styles:{
                        tableLabel1:{
                            color: 'blue'
                        },
                        header:{
                            fontSize: 18,
                            bold: true,
                            margin: [0, 0, 0, 10]
                        },
                        topTable:{
                            margin: [0, 5, 0, 25]
                        },
                        subheader:{
                            alignment: 'center',
                            color: 'blue'
                        },
                        subtitle:{
                            bold: true
                        },
                        
                        
                    }
                }
                pdfMake.createPdf(docDefinition).download('Report');
             }

            if($scope.isExcel)
            {
                var type = 'xlsx',fn;
                var elt = document.getElementById('printTable');
                var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
                XLSX.writeFile(wb, fn || ('Report.' + (type || 'xlsx')));
            }
        }

        


    };
    intApp.controller("maincntrl", MainController);
    