# Gabarits HTML du crayon et de l'éditeur générique (utilisés par les scripts de modification de la maquette).
PEN='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"></path><path d="M14 6l4 4"></path></svg>'
def pencil(x,size=40,bg="#F7F3EE"):
    return f'<button type="button" onClick="{{{{ {x}.edStart }}}}" aria-label="{{{{ {x}.edLabel }}}}" style="width: {size}px; height: {size}px; flex-shrink: 0; background: {bg}; border: 2px solid #2B2A30; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; color: #2B2A30">{PEN}</button>'
def editor(x):
    return f'''<sc-if value="{{{{ {x}.edOpen }}}}" hint-placeholder-val="{{{{ false }}}}">
<div style="display: flex; flex-direction: column; gap: 6px; padding: 8px; background: #FFFFFF; border: 2px dashed #2B2A30; transform: none; text-align: left">
<sc-for list="{{{{ {x}.edFields }}}}" as="ef">
<div style="display: flex; flex-direction: column; gap: 2px">
<label for="{{{{ ef.id }}}}" style="font-size: 12px; font-weight: 600; color: #4A4450">{{{{ ef.l }}}}</label>
<sc-if value="{{{{ ef.notArea }}}}" hint-placeholder-val="{{{{ true }}}}"><input id="{{{{ ef.id }}}}" type="{{{{ ef.type }}}}" inputmode="{{{{ ef.mode }}}}" value="{{{{ ef.v }}}}" onChange="{{{{ ef.on }}}}" placeholder="{{{{ ef.ph }}}}" style="height: 40px; box-sizing: border-box; padding: 0 8px; background: #F7F3EE; border: 2px solid #2B2A30; font-family: Inter, sans-serif; font-size: 14px; color: #2B2A30; border-radius: 0; width: 100%"></sc-if>
<sc-if value="{{{{ ef.isArea }}}}" hint-placeholder-val="{{{{ false }}}}"><textarea id="{{{{ ef.id }}}}" rows="4" value="{{{{ ef.v }}}}" onChange="{{{{ ef.on }}}}" placeholder="{{{{ ef.ph }}}}" style="box-sizing: border-box; width: 100%; padding: 6px 8px; background: #F7F3EE; border: 2px solid #2B2A30; font-family: Inter, sans-serif; font-size: 14px; color: #2B2A30; border-radius: 0; resize: vertical"></textarea></sc-if>
</div>
</sc-for>
<sc-for list="{{{{ {x}.edGroups }}}}" as="eg">
<span style="font-size: 12px; font-weight: 600; color: #4A4450">{{{{ eg.l }}}}</span>
<div style="display: flex; flex-wrap: wrap; gap: 4px">
<sc-for list="{{{{ eg.opts }}}}" as="eo"><button type="button" onClick="{{{{ eo.pick }}}}" aria-pressed="{{{{ eo.pressed }}}}" style="min-height: 36px; padding: 0 10px; background: {{{{ eo.bg }}}}; color: {{{{ eo.fg }}}}; border: {{{{ eo.bw }}}} solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 12px; font-weight: 600">{{{{ eo.label }}}}</button></sc-for>
</div>
</sc-for>
<div style="display: grid; grid-template-columns: {{{{ {x}.edCols }}}}; gap: 6px">
<sc-if value="{{{{ {x}.edHasDel }}}}" hint-placeholder-val="{{{{ false }}}}"><button type="button" onClick="{{{{ {x}.edDel }}}}" style="min-height: 44px; background: #B23A48; color: #FFFFFF; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 13px; font-weight: 600">{{{{ {x}.edDelText }}}}</button></sc-if>
<button type="button" onClick="{{{{ {x}.edCancel }}}}" style="min-height: 44px; background: #FFFFFF; color: #2B2A30; border: 2px solid #2B2A30; cursor: pointer; font-family: Inter, sans-serif; font-size: 13px; font-weight: 600">Annuler</button>
<button type="button" onClick="{{{{ {x}.edSave }}}}" style="min-height: 44px; background: #4A7034; color: #FFFFFF; border: 2px solid #2B2A30; cursor: pointer; font-family: 'Pixelify Sans', Inter, sans-serif; font-size: 15px; font-weight: 700">Enregistrer</button>
</div>
</div>
</sc-if>'''

