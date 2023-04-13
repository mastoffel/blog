function Span(el)
  if el.classes:includes("hover-bubble") then
      local hover_text = el.attributes['hover-text']
      if hover_text then
          local span = pandoc.Span(hover_text, {class = "hover-text"})
          el.content:insert(span)
          return el
      end
  end
end



