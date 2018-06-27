//* description: Parses RecordFlow Statements. */

/* manipulation functions */
%{


%}

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[a-zA-Z]([a-zA-Z0-9])*    return 'IDENTIFIER'
[0-9]+("."[0-9]+)?        return 'NUMBER'
\'([a-zA-Z0-9])*\'          return 'STRING'
"->"                        return 'RARROW' 
"<-"                        return 'LARROW'
":"                         return ':'
"{"                         return '{'
"}"                         return '}'
<<EOF>>                     return 'EOF'

/lex

/* operator associations and precedence */

%left RARROW
%left LARROW

%start input

%% /* language grammar */

input
    : exps EOF
    ;

exps
    : exp
    | exps exp
    ;

exp
    : exp_update
    ;

exp_update
    : record_map LARROW record_entity
    ;

record_entity
    : '{' record_item '}'
    ;

record_item
    : IDENTIFIER ':' STRING
    ;

record_map
    : collection_entity
    ;

collection_entity
    : IDENTIFIER
    ;
